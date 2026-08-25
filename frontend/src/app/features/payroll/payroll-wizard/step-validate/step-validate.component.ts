import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { StatCardComponent } from '../../../../shared/components/cards/stat-card/stat-card.component';
import { DataTableComponent, ColumnDef } from '../../../../shared/components/tables/data-table/data-table.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-step-validate',
  standalone: true,
  imports: [CommonModule, ButtonComponent, StatCardComponent, DataTableComponent, LucideAngularModule],
  templateUrl: './step-validate.component.html',
  styleUrls: ['./step-validate.component.scss']
})
export class StepValidateComponent {
  @Input() file: File | null = null;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  totalAmount = 450000.00;
  totalEmployees = 42;
  availableBalance = 600000.00;

  get hasSufficientFunds(): boolean {
    return this.availableBalance >= this.totalAmount;
  }

  columns: ColumnDef[] = [
    { key: 'employee', header: 'Empleado' },
    { key: 'department', header: 'Departamento' },
    { key: 'amount', header: 'Salario Neto', type: 'currency', align: 'right' }
  ];

  previewData = [
    { employee: 'Ana García', department: 'Ventas', amount: 15400.50 },
    { employee: 'Luis Martínez', department: 'Tecnología', amount: 22000.00 }
  ];

  onContinue() {
    if (this.hasSufficientFunds) {
      this.next.emit();
    }
  }
}
