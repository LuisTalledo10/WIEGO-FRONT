import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { DataTableComponent, ColumnDef } from '@shared/components/tables/data-table/data-table.component';
import { DataTableCellDirective } from '@shared/components/tables/data-table/data-table-cell.directive';
import { formatCurrency } from '@core/utils/format.util';
import { VendorsService } from '../data/vendors.service';
import { VendorBalance } from '../models/vendor.models';
import { VendorFormComponent } from '../vendor-form/vendor-form.component';
import { VendorPayablesComponent } from '../vendor-payables/vendor-payables.component';

@Component({
  selector: 'app-vendors-list',
  standalone: true,
  imports: [
    CommonModule, PageHeaderComponent, ButtonComponent, DataTableComponent, DataTableCellDirective,
    VendorFormComponent, VendorPayablesComponent
  ],
  templateUrl: './vendors-list.component.html'
})
export class VendorsListComponent implements OnInit {
  private readonly service = inject(VendorsService);

  readonly formatCurrency = formatCurrency;

  vendors: VendorBalance[] = [];
  isLoading = true;

  showForm = false;
  payablesVendor: VendorBalance | null = null;

  columns: ColumnDef[] = [
    { key: 'vendorName', header: 'Proveedor' },
    { key: 'openPayables', header: 'Facturas abiertas', align: 'center' },
    { key: 'balance', header: 'Saldo pendiente', align: 'right', type: 'custom' },
    { key: 'actions', header: '', align: 'right', type: 'custom' }
  ];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.service
      .list()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({ next: rows => (this.vendors = rows) });
  }

  onFormSaved(): void {
    this.showForm = false;
    this.load();
  }
}
