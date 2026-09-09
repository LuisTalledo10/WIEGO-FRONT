import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { StatCardComponent } from '@shared/components/cards/stat-card/stat-card.component';
import { DataTableComponent, ColumnDef } from '@shared/components/tables/data-table/data-table.component';
import { DataTableCellDirective } from '@shared/components/tables/data-table/data-table-cell.directive';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { SessionService } from '@core/services/session.service';
import { DashboardService, DashboardData } from '../data/dashboard.service';
import { formatCurrency } from '@core/utils/format.util';
import {
  BATCH_STATUS_BADGE, BATCH_STATUS_LABELS, BatchStatus, BATCH_KIND_LABELS
} from '@core/models/enums';
import { PaymentBatchSummary } from '@core/models/payment-batch.models';

echarts.use([BarChart, PieChart, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer]);

const ACTIVE_STATUSES: BatchStatus[] = ['DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'EXPORTED'];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, StatCardComponent, DataTableComponent, DataTableCellDirective,
    ButtonComponent, NgxEchartsDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [provideEchartsCore({ echarts })]
})
export class DashboardComponent implements OnInit {
  private readonly service = inject(DashboardService);
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  readonly formatCurrency = formatCurrency;
  readonly data = signal<DashboardData | null>(null);
  isLoading = true;

  readonly greetingName = computed(() => {
    const u = this.session.user();
    return (u?.name || u?.email || '').split(' ')[0] || '';
  });

  readonly totalPaid = computed(() => this.data()?.report.totalPaid ?? 0);
  readonly totalPending = computed(() => this.data()?.report.totalPending ?? 0);
  readonly activeOrders = computed(
    () => (this.data()?.batches ?? []).filter(b => ACTIVE_STATUSES.includes(b.status)).length
  );
  readonly vendorDebt = computed(
    () => (this.data()?.balances ?? []).reduce((s, v) => s + v.outstandingBalance, 0)
  );

  recentColumns: ColumnDef[] = [
    { key: 'name', header: 'Orden' },
    { key: 'kind', header: 'Tipo', type: 'custom' },
    {
      key: 'status', header: 'Estado', type: 'badge',
      badge: (row: PaymentBatchSummary) => ({
        status: BATCH_STATUS_BADGE[row.status], text: BATCH_STATUS_LABELS[row.status]
      })
    },
    { key: 'createdAt', header: 'Creada', type: 'date' }
  ];

  readonly recent = computed(() =>
    [...(this.data()?.batches ?? [])]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 6)
  );

  statusChart: EChartsOption = {};
  categoryChart: EChartsOption = {};

  ngOnInit(): void {
    this.isLoading = true;
    this.service.load().pipe(finalize(() => (this.isLoading = false))).subscribe({
      next: d => {
        this.data.set(d);
        this.buildCharts(d);
      }
    });
  }

  kindLabel(kind: PaymentBatchSummary['batchKind']): string {
    return BATCH_KIND_LABELS[kind];
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }

  openBatch(row: PaymentBatchSummary): void {
    const base = row.batchKind === 'Vendors' ? '/dispersiones' : '/planillas';
    this.router.navigate([base, row.id]);
  }

  private buildCharts(d: DashboardData): void {
    const byStatus = new Map<BatchStatus, number>();
    for (const b of d.batches) byStatus.set(b.status, (byStatus.get(b.status) ?? 0) + 1);

    this.statusChart = {
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, left: 'center' },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          data: [...byStatus.entries()].map(([status, value]) => ({
            name: BATCH_STATUS_LABELS[status],
            value
          }))
        }
      ]
    };

    const cats = d.report.byCategory ?? [];
    this.categoryChart = {
      tooltip: { trigger: 'axis' },
      grid: { left: 8, right: 16, bottom: 8, top: 16, containLabel: true },
      xAxis: { type: 'value' },
      yAxis: { type: 'category', data: cats.map(c => c.category) },
      series: [
        {
          type: 'bar',
          data: cats.map(c => c.totalAmount),
          itemStyle: { color: '#5140B8', borderRadius: [0, 6, 6, 0] }
        }
      ]
    };
  }
}
