import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, ColumnDef } from '../../../shared/components/tables/data-table/data-table.component';
import { ButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { PayrollWizardComponent } from '../payroll-wizard/payroll-wizard.component';

@Component({
  selector: 'app-payroll-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ButtonComponent, PayrollWizardComponent],
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.scss']
})
export class PayrollListComponent implements OnInit {
  isWizardOpen = false;
  isTableLoading = true;
  tableData: any[] = [];
  activeTab: 'history' | 'employees' = 'history';

  payrollColumns: ColumnDef[] = [
    { key: 'period', header: 'Periodo' },
    { key: 'date', header: 'Fecha de Pago', type: 'date' },
    { key: 'employees', header: 'Empleados', align: 'center' },
    { key: 'amount', header: 'Monto Total', type: 'currency', align: 'right' },
    { key: 'status', header: 'Estado' }
  ];

  employeeColumns: ColumnDef[] = [
    { key: 'id', header: 'ID Empleado' },
    { key: 'name', header: 'Nombre' },
    { key: 'department', header: 'Departamento' },
    { key: 'status', header: 'Estado' }
  ];

  ngOnInit() {
    this.loadData();
  }

  setTab(tab: 'history' | 'employees') {
    this.activeTab = tab;
    this.isTableLoading = true;
    this.tableData = [];
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      if (this.activeTab === 'history') {
        this.tableData = [
          { period: 'Quincena 1 - Feb', date: new Date(), employees: 42, amount: 450000.00, status: 'Pagado' },
          { period: 'Quincena 2 - Ene', date: new Date(Date.now() - 86400000 * 15), employees: 42, amount: 450000.00, status: 'Pagado' }
        ];
      } else {
        this.tableData = [
          { id: 'EMP-001', name: 'Ana García', department: 'Ventas', status: 'Activo' },
          { id: 'EMP-002', name: 'Luis Martínez', department: 'Tecnología', status: 'Activo' },
          { id: 'EMP-003', name: 'Carlos López', department: 'Recursos Humanos', status: 'Inactivo' }
        ];
      }
      this.isTableLoading = false;
    }, 1000);
  }

  openWizard() {
    this.isWizardOpen = true;
  }

  closeWizard() {
    this.isWizardOpen = false;
  }

  onWizardCompleted() {
    this.closeWizard();
    this.isTableLoading = true;
    this.loadData();
  }
}
