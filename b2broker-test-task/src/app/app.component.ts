import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterChangeI} from "./components/header/header.models";
import {BeResponseModel} from "./models/be-response.model";
import {TableRowViewModel} from "./components/table/table.models";
import {TableDataStoreService} from "./services/table-data-store.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public tableData: Observable<TableRowViewModel[]> = this._tableDataStoreService.tableData$;
  public tableDataLoading: Observable<boolean> = this._tableDataStoreService.loading$;

  private readonly TABLE_ROWS_COUNT = 10;
  private _worker: Worker | undefined;
  private _tableDataSubscription$!: Subscription;
  private _filterValue: FilterChangeI;

  constructor(private _tableDataStoreService: TableDataStoreService) {
  }

  ngOnInit(): void {
    this._initWebWorker();
  }

  onFilterChangeHandler(filterValue: FilterChangeI): void {
    this._filterValue = filterValue;
    this._tableDataStoreService.loadingOn();

    setTimeout(() => {
      if (this._worker) {
        this._worker.postMessage(filterValue);
      } else {
        console.error('Workers not supported!!!.');
      }

      this._tableDataStoreService.loadingOff();
    }, filterValue.timer);
  }

  private _initWebWorker(): void {
    if (typeof Worker !== 'undefined') {
      this._worker = new Worker(new URL('./web-worker/app.worker', import.meta.url));
      this._worker.onmessage = ({ data }) => {
        this._socketResponseHandler(data);
      };
    } else {
      console.error('Workers not supported!!!');
    }
  }

  private _socketResponseHandler(data: BeResponseModel[]): void {
    this._tableDataStoreService.updateTableData(this._getSocketResponseLast10ElementsInTableRowViewTypeAndOverrideIds(data));
  }

  private _getSocketResponseLast10ElementsInTableRowViewTypeAndOverrideIds(data: BeResponseModel[]): TableRowViewModel[] {
    const tableRowsArray: TableRowViewModel[] = [];
    const additionalArrayIds: string[] = [...this._filterValue.additionalArrayIds];

    for (let i = data.length - this.TABLE_ROWS_COUNT; i < data.length; i++) {
      const tableRow = new TableRowViewModel();
      const iterationItem = data[i];

      if (additionalArrayIds.length) {
        tableRow.id = additionalArrayIds[0];
        additionalArrayIds.splice(0, 1);
      } else {
        tableRow.id = iterationItem.id;
      }

      tableRow.int = iterationItem.int;
      tableRow.float = iterationItem.float.toString();
      tableRow.color = iterationItem.color;
      tableRow.child = {
        id: iterationItem.child.id,
        color: iterationItem.child.color
      }

      tableRowsArray.push(tableRow);
    }

    return tableRowsArray;
  }

  ngOnDestroy(): void {
    this._tableDataSubscription$.unsubscribe();
  }
}
