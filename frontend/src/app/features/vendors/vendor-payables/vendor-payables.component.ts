import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { DrawerComponent } from '@shared/components/modals/drawer/drawer.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { InputComponent } from '@shared/components/inputs/input/input.component';
import { SelectComponent, SelectOption } from '@shared/components/inputs/select/select.component';
import { StatusBadgeComponent } from '@shared/components/badges/status-badge/status-badge.component';
import { SkeletonComponent } from '@shared/components/loading/skeleton/skeleton.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state/empty-state.component';
import { NotificationService } from '@core/services/notification.service';
import { CURRENCIES, DEFAULT_CURRENCY_ID } from '@core/models/catalogs';
import { PAYABLE_STATUS_BADGE, PAYABLE_STATUS_LABELS } from '@core/models/enums';
import { formatCurrency } from '@core/utils/format.util';
import { VendorsService } from '../data/vendors.service';
import { VendorBalance, VendorPayable, VendorPayableFormValue } from '../models/vendor.models';

@Component({
  selector: 'app-vendor-payables',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, DrawerComponent, ButtonComponent, InputComponent,
    SelectComponent, StatusBadgeComponent, SkeletonComponent, EmptyStateComponent
  ],
  templateUrl: './vendor-payables.component.html',
  styleUrls: ['./vendor-payables.component.scss']
})
export class VendorPayablesComponent implements OnInit {
  @Input({ required: true }) vendor!: VendorBalance;
  @Output() closed = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(VendorsService);
  private readonly notify = inject(NotificationService);

  readonly formatCurrency = formatCurrency;
  readonly statusLabel = PAYABLE_STATUS_LABELS;
  readonly statusBadge = PAYABLE_STATUS_BADGE;
  readonly currencyOptions: SelectOption[] = CURRENCIES.map(c => ({ value: c.id, label: c.label }));

  payables: VendorPayable[] = [];
  isLoading = true;
  isSaving = false;
  showForm = false;

  form = this.fb.nonNullable.group({
    documentNumber: ['', [Validators.required, Validators.maxLength(40)]],
    issueDate: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
    totalAmount: [0, [Validators.required, Validators.min(0.01)]],
    currencyId: [DEFAULT_CURRENCY_ID, [Validators.required]]
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.service
      .payables(this.vendor.vendorId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({ next: rows => (this.payables = rows) });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value: VendorPayableFormValue = {
      vendorId: this.vendor.vendorId,
      ...this.form.getRawValue()
    };
    this.isSaving = true;
    this.service.createPayable(value).subscribe({
      next: () => {
        this.notify.success('Cuenta por pagar registrada.');
        this.isSaving = false;
        this.showForm = false;
        this.form.reset({ totalAmount: 0, currencyId: DEFAULT_CURRENCY_ID });
        this.load();
        this.changed.emit();
      },
      error: () => (this.isSaving = false)
    });
  }

  cancelPayable(payable: VendorPayable): void {
    this.service.cancelPayable(payable.id).subscribe({
      next: () => {
        this.notify.success('Cuenta por pagar cancelada.');
        this.load();
        this.changed.emit();
      }
    });
  }
}
