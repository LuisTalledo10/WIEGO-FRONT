import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { finalize } from 'rxjs';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { StatusBadgeComponent } from '@shared/components/badges/status-badge/status-badge.component';
import { DataTableComponent, ColumnDef } from '@shared/components/tables/data-table/data-table.component';
import { DataTableCellDirective } from '@shared/components/tables/data-table/data-table-cell.directive';
import { SkeletonComponent } from '@shared/components/loading/skeleton/skeleton.component';
import { ConfirmDialogComponent } from '@shared/components/modals/confirm-dialog/confirm-dialog.component';
import { ModalComponent } from '@shared/components/modals/modal/modal.component';
import { SessionService } from '@core/services/session.service';
import { NotificationService } from '@core/services/notification.service';
import { PaymentBatchesService } from '@core/data/payment-batches.service';
import { PaymentBatchDetail } from '@core/models/payment-batch.models';
import { formatCurrency, formatPeriod } from '@core/utils/format.util';
import {
  BATCH_KIND_LABELS, BATCH_STATUS_BADGE, BATCH_STATUS_LABELS,
  ITEM_STATUS_BADGE, ITEM_STATUS_LABELS, CAN_APPROVE, CAN_SUBMIT_OR_EXPORT
} from '@core/models/enums';

type ActionKey = 'submit' | 'approve' | 'reject' | 'export' | 'complete';

@Component({
  selector: 'app-batch-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, LucideAngularModule, ButtonComponent, StatusBadgeComponent,
    DataTableComponent, DataTableCellDirective, SkeletonComponent, ConfirmDialogComponent, ModalComponent
  ],
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(PaymentBatchesService);
  private readonly session = inject(SessionService);
  private readonly notify = inject(NotificationService);

  readonly formatCurrency = formatCurrency;
  readonly formatPeriod = formatPeriod;
  readonly kindLabels = BATCH_KIND_LABELS;
  readonly statusLabels = BATCH_STATUS_LABELS;
  readonly statusBadge = BATCH_STATUS_BADGE;
  readonly itemStatusLabels = ITEM_STATUS_LABELS;
  readonly itemStatusBadge = ITEM_STATUS_BADGE;

  readonly batch = signal<PaymentBatchDetail | null>(null);
  isLoading = true;

  pendingAction: ActionKey | null = null;
  isActing = false;
  rejectReason = '';

  columns: ColumnDef[] = [
    { key: 'payeeName', header: 'Beneficiario' },
    { key: 'bankName', header: 'Banco' },
    { key: 'concept', header: 'Concepto' },
    { key: 'amount', header: 'Monto', align: 'right', type: 'custom' },
    {
      key: 'status', header: 'Estado', type: 'badge',
      badge: (row: { status: keyof typeof ITEM_STATUS_LABELS }) => ({
        status: this.itemStatusBadge[row.status], text: this.itemStatusLabels[row.status]
      })
    }
  ];

  readonly total = computed(() =>
    (this.batch()?.items ?? []).reduce((sum, i) => sum + i.amount, 0)
  );

  readonly backLink = computed(() =>
    this.batch()?.batchKind === 'Vendors' ? '/dispersiones' : '/planillas'
  );

  readonly canSubmit = computed(() => {
    const b = this.batch();
    return !!b && (b.status === 'DRAFT' || b.status === 'REJECTED')
      && b.items.length > 0 && this.session.hasRole(...CAN_SUBMIT_OR_EXPORT);
  });
  readonly canApprove = computed(() =>
    this.batch()?.status === 'PENDING_APPROVAL' && this.session.hasRole(...CAN_APPROVE)
  );
  readonly canExport = computed(() =>
    this.batch()?.status === 'APPROVED' && this.session.hasRole(...CAN_SUBMIT_OR_EXPORT)
  );
  readonly canComplete = computed(() =>
    this.batch()?.status === 'EXPORTED' && this.session.hasRole(...CAN_SUBMIT_OR_EXPORT)
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.isLoading = true;
    this.service.get(id).pipe(finalize(() => (this.isLoading = false))).subscribe({
      next: b => this.batch.set(b),
      error: () => this.router.navigate([this.backLink()])
    });
  }

  ask(action: ActionKey): void {
    this.rejectReason = '';
    this.pendingAction = action;
  }

  confirm(): void {
    const b = this.batch();
    if (!b || !this.pendingAction) return;
    this.isActing = true;

    const done = (msg: string) => {
      this.notify.success(msg);
      this.pendingAction = null;
      this.isActing = false;
      this.load();
    };
    const fail = () => (this.isActing = false);

    switch (this.pendingAction) {
      case 'submit':
        this.service.submit(b.id).subscribe({ next: () => done('Orden enviada a aprobación.'), error: fail });
        break;
      case 'approve':
        this.service.approve(b.id).subscribe({ next: () => done('Orden aprobada.'), error: fail });
        break;
      case 'reject':
        if (!this.rejectReason.trim()) { this.isActing = false; return; }
        this.service.reject(b.id, this.rejectReason.trim()).subscribe({ next: () => done('Orden rechazada.'), error: fail });
        break;
      case 'export':
        this.service.export(b.id).subscribe({ next: () => done('Archivo(s) de banco generado(s).'), error: fail });
        break;
      case 'complete':
        this.service.complete(b.id).subscribe({ next: () => done('Orden marcada como pagada.'), error: fail });
        break;
    }
  }

  get dialogTitle(): string {
    return {
      submit: 'Enviar a aprobación',
      approve: 'Aprobar orden',
      reject: 'Rechazar orden',
      export: 'Exportar a banco',
      complete: 'Marcar como pagada'
    }[this.pendingAction ?? 'submit'];
  }

  get dialogMessage(): string {
    return {
      submit: 'La orden pasará a revisión y no podrá editarse hasta que sea aprobada o rechazada.',
      approve: 'Confirmas que los montos y beneficiarios son correctos.',
      reject: 'Indica el motivo del rechazo. La orden volverá a borrador.',
      export: 'Se generará el archivo de pago por banco para entregar a la entidad financiera.',
      complete: 'Marca la orden como pagada. Se descontarán las cuentas por pagar de los proveedores.'
    }[this.pendingAction ?? 'submit'];
  }

  get dialogConfirmText(): string {
    return { submit: 'Enviar', approve: 'Aprobar', reject: 'Rechazar', export: 'Exportar', complete: 'Marcar pagada' }[
      this.pendingAction ?? 'submit'
    ];
  }
}
