import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * Marks an <ng-template> as the renderer for a data-table column.
 * Usage: <ng-template appDataTableCell="status" let-row>...</ng-template>
 */
@Directive({
  selector: '[appDataTableCell]',
  standalone: true
})
export class DataTableCellDirective {
  @Input('appDataTableCell') columnKey = '';

  constructor(public template: TemplateRef<{ $implicit: unknown }>) {}
}
