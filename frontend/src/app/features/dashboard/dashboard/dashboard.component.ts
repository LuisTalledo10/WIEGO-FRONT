import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/cards/stat-card/stat-card.component';
import { DataTableComponent, ColumnDef } from '../../../shared/components/tables/data-table/data-table.component';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, LineChart, PieChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer]);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DataTableComponent, NgxEchartsDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class DashboardComponent implements OnInit {
  lineChartOption: EChartsOption = {};
  donutChartOption: EChartsOption = {};

  tableColumns: ColumnDef[] = [
    { key: 'date', header: 'Fecha', type: 'date' },
    { key: 'description', header: 'Descripción' },
    { key: 'amount', header: 'Monto', type: 'currency', align: 'right' },
    { key: 'status', header: 'Estado' }
  ];
  
  tableData: any[] = [];
  isTableLoading = true;

  ngOnInit(): void {
    this.initCharts();
    this.loadMockData();
  }

  initCharts() {
    this.lineChartOption = {
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Dispersiones',
          type: 'line',
          smooth: true,
          lineStyle: { color: '#5140B8' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: 'rgba(81, 64, 184, 0.5)' }, { offset: 1, color: 'rgba(81, 64, 184, 0.05)' }]
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    };

    this.donutChartOption = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: 'Operaciones',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false, position: 'center' },
          labelLine: { show: false },
          data: [
            { value: 1048, name: 'Completadas', itemStyle: { color: '#00B171' } },
            { value: 300, name: 'En Proceso', itemStyle: { color: '#FFB800' } },
            { value: 50, name: 'Fallidas', itemStyle: { color: '#D92D45' } }
          ]
        }
      ]
    };
  }

  loadMockData() {
    setTimeout(() => {
      this.tableData = [
        { date: new Date(), description: 'Pago de Nómina Q1', amount: 15400.50, status: 'Completado' },
        { date: new Date(Date.now() - 86400000), description: 'Proveedores CMX', amount: 3200.00, status: 'En Proceso' },
        { date: new Date(Date.now() - 172800000), description: 'Servicios Cloud', amount: 450.75, status: 'Completado' }
      ];
      this.isTableLoading = false;
    }, 1500);
  }
}
