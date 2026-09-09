import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { ModalComponent } from '@shared/components/modals/modal/modal.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { InputComponent } from '@shared/components/inputs/input/input.component';
import { SelectComponent, SelectOption } from '@shared/components/inputs/select/select.component';
import { PaymentBatchesService } from '@core/data/payment-batches.service';
import { NotificationService } from '@core/services/notification.service';
import { formatCurrency } from '@core/utils/format.util';
import { VendorsService } from '@features/vendors/data/vendors.service';
import { VendorBalance, VendorPayable } from '@features/vendors/models/vendor.models';

interface Line {
  vendorId: string;
  vendorName: string;
  payableId: string;
  payableLabel: string;
  amount: number;
  currencyId: number;
  concept: string;
}

@Component({
  selector: 'app-dispersion-wizard',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, ModalComponent, ButtonComponent, InputComponent, SelectComponent
  ],
  templateUrl: './dispersion-wizard.component.html',
  styleUrls: ['./dispersion-wizard.component.scss']
})
export class DispersionWizardComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() completed = new EventEmitter<string>();

  private readonly fb = inject(FormBuilder);
  private readonly batches = inject(PaymentBatchesService);
  private readonly vendorsService = inject(VendorsService);
  private readonly notify = inject(NotificationService);

  readonly formatCurrency = formatCurrency;

  step: 1 | 2 | 3 = 1;
  isWorking = false;
  batchId: string | null = null;

  detailsForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]]
  });

  vendors: VendorBalance[] = [];
  vendorOptions: SelectOption[] = [];
  payables: VendorPayable[] = [];
  payableOptions: SelectOption[] = [];

  lineForm = this.fb.nonNullable.group({
    vendorId: ['', [Validators.required]],
    payableId: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    concept: ['Pago a proveedor', [Validators.required]]
  });

  lines: Line[] = [];

  constructor() {
    this.lineForm.controls.vendorId.valueChanges.subscribe(() => this.onVendorChange());
  }

  get modalTitle(): string {
    return { 1: 'Nueva dispersión · Datos', 2: 'Nueva dispersión · Facturas', 3: 'Nueva dispersión · Revisión' }[this.step];
  }

  get total(): number {
    return this.lines.reduce((s, l) => s + l.amount, 0);
  }

  get selectedPayable(): VendorPayable | undefined {
    return this.payables.find(p => p.id === this.lineForm.getRawValue().payableId);
  }

  next(): void {
    if (this.step === 1) this.createBatch();
    else if (this.step === 2) this.persistLines();
    else this.submit();
  }

  back(): void {
    if (this.step === 3) this.step = 2;
    else if (this.step === 2) this.step = 1;
  }

  onVendorChange(): void {
    const vendorId = this.lineForm.getRawValue().vendorId;
    this.lineForm.patchValue({ payableId: '' });
    this.payables = [];
    this.payableOptions = [];
    if (!vendorId) return;
    this.vendorsService.payables(vendorId, 'Open').subscribe({
      next: rows => {
        this.payables = rows.filter(p => p.balance > 0);
        this.payableOptions = this.payables.map(p => ({
          value: p.id,
          label: `${p.documentNumber} · saldo ${this.formatCurrency(p.balance, p.currencyId)}`
        }));
      }
    });
  }

  addLine(): void {
    if (this.lineForm.invalid) {
      this.lineForm.markAllAsTouched();
      return;
    }
    const v = this.lineForm.getRawValue();
    const vendor = this.vendors.find(x => x.vendorId === v.vendorId);
    const payable = this.payables.find(x => x.id === v.payableId);
    if (!vendor || !payable) return;
    if (v.amount > payable.balance) {
      this.notify.error('El monto supera el saldo de la factura.');
      return;
    }
    this.lines = [
      ...this.lines,
      {
        vendorId: vendor.vendorId,
        vendorName: vendor.vendorName,
        payableId: payable.id,
        payableLabel: payable.documentNumber,
        amount: v.amount,
        currencyId: payable.currencyId,
        concept: v.concept.trim() || 'Pago a proveedor'
      }
    ];
    this.lineForm.reset({ vendorId: '', payableId: '', amount: 0, concept: 'Pago a proveedor' });
    this.payables = [];
    this.payableOptions = [];
  }

  removeLine(index: number): void {
    this.lines = this.lines.filter((_, i) => i !== index);
  }

  private createBatch(): void {
    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      return;
    }
    if (this.batchId) {
      this.step = 2;
      this.loadVendors();
      return;
    }
    this.isWorking = true;
    this.batches.create({ name: this.detailsForm.getRawValue().name, batchKind: 'Vendors' }).subscribe({
      next: id => {
        this.batchId = id;
        this.isWorking = false;
        this.step = 2;
        this.loadVendors();
      },
      error: () => (this.isWorking = false)
    });
  }

  private loadVendors(): void {
    if (this.vendors.length) return;
    this.vendorsService.list().subscribe({
      next: rows => {
        this.vendors = rows;
        this.vendorOptions = rows.map(r => ({ value: r.vendorId, label: r.vendorName }));
      }
    });
  }

  private persistLines(): void {
    if (!this.batchId || !this.lines.length) {
      this.notify.warning('Agrega al menos una factura a pagar.');
      return;
    }
    const currencies = new Set(this.lines.map(l => l.currencyId));
    if (currencies.size > 1) {
      this.notify.error('Todas las facturas de una dispersión deben usar la misma moneda.');
      return;
    }
    this.isWorking = true;
    const calls = this.lines.map(l =>
      this.batches.addItem({
        paymentBatchId: this.batchId!,
        payeeType: 'Vendor',
        vendorId: l.vendorId,
        vendorPayableId: l.payableId,
        amount: l.amount,
        currencyId: l.currencyId,
        concept: l.concept
      })
    );
    forkJoin(calls.length ? calls : [of(null)]).subscribe({
      next: () => {
        this.isWorking = false;
        this.step = 3;
      },
      error: () => (this.isWorking = false)
    });
  }

  private submit(): void {
    if (!this.batchId) return;
    this.isWorking = true;
    this.batches.submit(this.batchId).subscribe({
      next: () => {
        this.notify.success('Dispersión enviada a aprobación.');
        this.completed.emit(this.batchId!);
      },
      error: () => (this.isWorking = false)
    });
  }
}
