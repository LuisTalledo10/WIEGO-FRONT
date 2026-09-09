import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { DataTableComponent, ColumnDef } from '@shared/components/tables/data-table/data-table.component';
import { DataTableCellDirective } from '@shared/components/tables/data-table/data-table-cell.directive';
import { PaymentBatchesService } from '@core/data/payment-batches.service';
import { PaymentBatchSummary } from '@core/models/payment-batch.models';
import {
  BATCH_KIND_LABELS, BATCH_STATUS_BADGE, BATCH_STATUS_LABELS, BatchStatus
} from '@core/models/enums';

interface Tab {
  key: 'ALL' | BatchStatus;
  label: string;
}

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, DataTableComponent, DataTableCellDirective],
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  private readonly service = inject(PaymentBatchesService);
  private readonly router = inject(Router);

  all: PaymentBatchSummary[] = [];
  isLoading = true;
  activeTab: Tab['key'] = 'ALL';

  tabs: Tab[] = [
    { key: 'ALL', label: 'Todas' },
    { key: 'DRAFT', label: 'Borrador' },
    { key: 'PENDING_APPROVAL', label: 'Pendientes' },
    { key: 'APPROVED', label: 'Aprobadas' },
    { key: 'EXPORTED', label: 'Exportadas' },
    { key: 'COMPLETED', label: 'Pagadas' },
    { key: 'REJECTED', label: 'Rechazadas' }
  ];

  columns: ColumnDef[] = [
    { key: 'name', header: 'Orden' },
    { key: 'batchKind', header: 'Tipo', type: 'custom' },
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

  get rows(): PaymentBatchSummary[] {
    return this.activeTab === 'ALL' ? this.all : this.all.filter(b => b.status === this.activeTab);
  }

  kindLabel(kind: PaymentBatchSummary['batchKind']): string {
    return BATCH_KIND_LABELS[kind];
  }

  load(): void {
    this.isLoading = true;
    this.service
      .list()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({ next: rows => (this.all = rows) });
  }

  open(row: PaymentBatchSummary): void {
    const base = row.batchKind === 'Vendors' ? '/dispersiones' : '/planillas';
    this.router.navigate([base, row.id]);
  }
}
