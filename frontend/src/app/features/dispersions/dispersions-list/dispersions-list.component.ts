import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { DataTableComponent, ColumnDef } from '@shared/components/tables/data-table/data-table.component';
import { PaymentBatchesService } from '@core/data/payment-batches.service';
import { PaymentBatchSummary } from '@core/models/payment-batch.models';
import { BATCH_STATUS_BADGE, BATCH_STATUS_LABELS } from '@core/models/enums';
import { DispersionWizardComponent } from '../dispersion-wizard/dispersion-wizard.component';

@Component({
  selector: 'app-dispersions-list',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, ButtonComponent, DataTableComponent, DispersionWizardComponent],
  templateUrl: './dispersions-list.component.html'
})
export class DispersionsListComponent implements OnInit {
  private readonly service = inject(PaymentBatchesService);
  private readonly router = inject(Router);

  batches: PaymentBatchSummary[] = [];
  isLoading = true;
  isWizardOpen = false;

  columns: ColumnDef[] = [
    { key: 'name', header: 'Dispersión' },
    {
      key: 'status', header: 'Estado', type: 'badge',
      badge: (row: PaymentBatchSummary) => ({
        status: BATCH_STATUS_BADGE[row.status], text: BATCH_STATUS_LABELS[row.status]
      })
    },
    { key: 'createdAt', header: 'Creada', type: 'date' }
  ];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.service
      .list('Vendors')
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({ next: rows => (this.batches = rows) });
  }

  open(row: PaymentBatchSummary): void {
    this.router.navigate(['/dispersiones', row.id]);
  }

  onWizardDone(batchId: string): void {
    this.isWizardOpen = false;
    this.router.navigate(['/dispersiones', batchId]);
  }
}
