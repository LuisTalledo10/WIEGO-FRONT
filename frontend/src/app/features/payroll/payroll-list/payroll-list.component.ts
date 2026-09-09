import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { DataTableComponent, ColumnDef } from '@shared/components/tables/data-table/data-table.component';
import { DataTableCellDirective } from '@shared/components/tables/data-table/data-table-cell.directive';
import { PaymentBatchesService } from '@core/data/payment-batches.service';
import { PaymentBatchSummary } from '@core/models/payment-batch.models';
import { BATCH_STATUS_BADGE, BATCH_STATUS_LABELS } from '@core/models/enums';
import { formatPeriod } from '@core/utils/format.util';
import { PayrollWizardComponent } from '../payroll-wizard/payroll-wizard.component';

@Component({
  selector: 'app-payroll-list',
  standalone: true,
  imports: [
    CommonModule, PageHeaderComponent, ButtonComponent, DataTableComponent,
    DataTableCellDirective, PayrollWizardComponent
  ],
  templateUrl: './payroll-list.component.html'
})
export class PayrollListComponent implements OnInit {
  private readonly service = inject(PaymentBatchesService);
  private readonly router = inject(Router);

  batches: PaymentBatchSummary[] = [];
  isLoading = true;
  isWizardOpen = false;

  columns: ColumnDef[] = [
    { key: 'name', header: 'Planilla' },
    { key: 'period', header: 'Periodo', type: 'custom' },
    {
      key: 'status', header: 'Estado', type: 'badge',
      badge: (row: PaymentBatchSummary) => ({
        status: BATCH_STATUS_BADGE[row.status], text: BATCH_STATUS_LABELS[row.status]
      })
    },
    { key: 'createdAt', header: 'Creada', type: 'date' }
  ];

  readonly formatPeriod = formatPeriod;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.service
      .list('Payroll')
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({ next: rows => (this.batches = rows) });
  }

  open(row: PaymentBatchSummary): void {
    this.router.navigate(['/planillas', row.id]);
  }

  onWizardDone(batchId: string): void {
    this.isWizardOpen = false;
    this.router.navigate(['/planillas', batchId]);
  }
}
