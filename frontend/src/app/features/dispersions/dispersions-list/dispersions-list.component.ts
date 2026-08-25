import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, ColumnDef } from '../../../shared/components/tables/data-table/data-table.component';
import { ButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { DispersionWizardComponent } from '../dispersion-wizard/dispersion-wizard.component';

@Component({
  selector: 'app-dispersions-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ButtonComponent, DispersionWizardComponent],
  templateUrl: './dispersions-list.component.html',
  styleUrls: ['./dispersions-list.component.scss']
})
export class DispersionsListComponent implements OnInit {
  isWizardOpen = false;
  isTableLoading = true;
  tableData: any[] = [];

  tableColumns: ColumnDef[] = [
    { key: 'id', header: 'ID' },
    { key: 'date', header: 'Fecha', type: 'date' },
    { key: 'description', header: 'Descripción' },
    { key: 'records', header: 'Registros', align: 'center' },
    { key: 'amount', header: 'Monto Total', type: 'currency', align: 'right' },
    { key: 'status', header: 'Estado' }
  ];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.tableData = [
        { id: 'DSP-1023', date: new Date(), description: 'Pago Quincena 1', records: 154, amount: 245000.00, status: 'Completado' },
        { id: 'DSP-1022', date: new Date(Date.now() - 86400000*5), description: 'Proveedores Marzo', records: 12, amount: 15400.50, status: 'Completado' }
      ];
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
