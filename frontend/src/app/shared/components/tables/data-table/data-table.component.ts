import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../loading/skeleton/skeleton.component';
import { EmptyStateComponent } from '../../empty-state/empty-state/empty-state.component';
import { StatusBadgeComponent, BadgeStatus } from '../../badges/status-badge/status-badge.component';
import { DataTableCellDirective } from './data-table-cell.directive';

export interface ColumnDef {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  type?: 'text' | 'currency' | 'date' | 'badge' | 'custom';
  /** For type 'badge': maps a row to a badge status + text. */
  badge?: (row: any) => { status: BadgeStatus; text: string };
  /** For type 'currency': currency symbol or currency id. */
  currency?: string | number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterContentInit {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() isLoading = false;
  @Input() clickableRows = false;
  @Input() emptyTitle = 'No hay datos';
  @Input() emptyMessage = 'No se encontraron registros para mostrar.';

  @Output() rowClicked = new EventEmitter<any>();

  @ContentChildren(DataTableCellDirective) cellTemplates!: QueryList<DataTableCellDirective>;

  skeletonRows = Array(5).fill(0);
  private templateMap = new Map<string, TemplateRef<{ $implicit: unknown }>>();

  ngAfterContentInit(): void {
    this.cellTemplates.forEach(t => this.templateMap.set(t.columnKey, t.template));
  }

  templateFor(key: string): TemplateRef<{ $implicit: unknown }> | null {
    return this.templateMap.get(key) ?? null;
  }
}
