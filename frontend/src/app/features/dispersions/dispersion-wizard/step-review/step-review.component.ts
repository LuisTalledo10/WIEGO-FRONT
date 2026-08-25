import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { StatCardComponent } from '../../../../shared/components/cards/stat-card/stat-card.component';
import { DataTableComponent, ColumnDef } from '../../../../shared/components/tables/data-table/data-table.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-step-review',
  standalone: true,
  imports: [CommonModule, ButtonComponent, StatCardComponent, DataTableComponent, LucideAngularModule],
  templateUrl: './step-review.component.html',
  styleUrls: ['./step-review.component.scss']
})
export class StepReviewComponent {
  @Input() file: File | null = null;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  totalAmount = 24500.50;
  totalRecords = 12;
  availableBalance = 145250.00;

  get hasSufficientFunds(): boolean {
    return this.availableBalance >= this.totalAmount;
  }

  columns: ColumnDef[] = [
    { key: 'account', header: 'Cuenta / CLABE' },
    { key: 'bank', header: 'Banco' },
    { key: 'amount', header: 'Monto', type: 'currency', align: 'right' }
  ];

  previewData = [
    { account: '012345678901234567', bank: 'BBVA', amount: 15000.00 },
    { account: '987654321098765432', bank: 'Santander', amount: 9500.50 }
  ];

  onContinue() {
    if (this.hasSufficientFunds) {
      this.next.emit();
    }
  }
}
