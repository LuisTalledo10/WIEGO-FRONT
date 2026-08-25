import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, ColumnDef } from '../../../shared/components/tables/data-table/data-table.component';
import { ButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { BeneficiaryFormComponent } from '../beneficiary-form/beneficiary-form.component';

@Component({
  selector: 'app-beneficiaries-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, ButtonComponent, BeneficiaryFormComponent],
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.scss']
})
export class BeneficiariesListComponent implements OnInit {
  isDrawerOpen = false;
  isTableLoading = true;
  tableData: any[] = [];

  columns: ColumnDef[] = [
    { key: 'alias', header: 'Alias' },
    { key: 'name', header: 'Nombre Completo' },
    { key: 'bank', header: 'Banco' },
    { key: 'clabe', header: 'Cuenta CLABE' },
    { key: 'email', header: 'Correo Electrónico' },
    { key: 'status', header: 'Estado' }
  ];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.tableData = [
        { alias: 'Servicios Cloud', name: 'Amazon Web Services', bank: 'Banamex', clabe: '002123456789012345', email: 'billing@aws.com', status: 'Activo' },
        { alias: 'Limpieza Oficina', name: 'Servicios de Limpieza S.A.', bank: 'BBVA', clabe: '012987654321098765', email: 'contacto@limpieza.mx', status: 'Activo' },
        { alias: 'Abogados', name: 'Despacho Legal MX', bank: 'Santander', clabe: '014112233445566778', email: 'cobranza@despacho.com', status: 'Inactivo' }
      ];
      this.isTableLoading = false;
    }, 1200);
  }

  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  onBeneficiarySaved() {
    this.closeDrawer();
    this.isTableLoading = true;
    this.loadData();
  }
}
