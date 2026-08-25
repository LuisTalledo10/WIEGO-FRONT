import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../loading/skeleton/skeleton.component';
import { EmptyStateComponent } from '../../empty-state/empty-state/empty-state.component';

export interface ColumnDef {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  type?: 'text' | 'currency' | 'date' | 'badge' | 'custom';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, EmptyStateComponent],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() emptyTitle: string = 'No hay datos';
  @Input() emptyMessage: string = 'No se encontraron registros para mostrar.';

  @Output() rowClicked = new EventEmitter<any>();

  skeletonRows = Array(5).fill(0);
}
