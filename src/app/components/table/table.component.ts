import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TableRowViewModel} from "./table.models";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() dataSource: TableRowViewModel[] = [];
  @Input() loading: boolean = false;

  displayedColumns: string[] = ['id', 'int', 'float', 'color', 'child'];
  childDisplayColumns: string[] = ['id', 'color'];
}
