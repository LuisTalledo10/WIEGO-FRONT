import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DrawerComponent } from '@shared/components/modals/drawer/drawer.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { InputComponent } from '@shared/components/inputs/input/input.component';
import { SelectComponent, SelectOption } from '@shared/components/inputs/select/select.component';
import { NotificationService } from '@core/services/notification.service';
import { BANKS, CURRENCIES, DEFAULT_CURRENCY_ID } from '@core/models/catalogs';
import { ACCOUNT_TYPE_LABELS, DOCUMENT_TYPE_LABELS } from '@core/models/enums';
import { VendorsService } from '../data/vendors.service';
import { VendorFormValue } from '../models/vendor.models';

@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DrawerComponent, ButtonComponent, InputComponent, SelectComponent],
  templateUrl: './vendor-form.component.html'
})
export class VendorFormComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(VendorsService);
  private readonly notify = inject(NotificationService);

  isSaving = false;

  readonly bankOptions: SelectOption[] = BANKS.map(b => ({ value: b.value, label: b.label }));
  readonly currencyOptions: SelectOption[] = CURRENCIES.map(c => ({ value: c.id, label: c.label }));
  readonly docTypeOptions: SelectOption[] = (Object.keys(DOCUMENT_TYPE_LABELS) as (keyof typeof DOCUMENT_TYPE_LABELS)[])
    .map(k => ({ value: k, label: DOCUMENT_TYPE_LABELS[k] }));
  readonly accountTypeOptions: SelectOption[] = (Object.keys(ACCOUNT_TYPE_LABELS) as (keyof typeof ACCOUNT_TYPE_LABELS)[])
    .map(k => ({ value: k, label: ACCOUNT_TYPE_LABELS[k] }));

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    documentType: ['RUC', [Validators.required]],
    documentNumber: ['', [Validators.required, Validators.maxLength(20)]],
    bank: ['Bcp', [Validators.required]],
    accountType: ['Corriente', [Validators.required]],
    accountNumber: ['', [Validators.required, Validators.maxLength(50)]],
    cci: ['', [Validators.required, Validators.maxLength(30)]],
    currencyId: [DEFAULT_CURRENCY_ID, [Validators.required]]
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.service.create(this.form.getRawValue() as VendorFormValue).subscribe({
      next: () => {
        this.notify.success('Proveedor creado.');
        this.saved.emit();
      },
      error: () => (this.isSaving = false)
    });
  }
}
