import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {TableRowViewModel} from "../components/table/table.models";


@Injectable({
  providedIn: "root"
})
export class TableDataStoreService {
  private readonly _tableData: BehaviorSubject<TableRowViewModel[]> = new BehaviorSubject<TableRowViewModel[]>([])
  readonly tableData$: Observable<TableRowViewModel[]> = this._tableData.asObservable();

  private readonly _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly loading$: Observable<boolean> = this._loading.asObservable();

  updateTableData(tableData: TableRowViewModel[]): void {
    this._tableData.next(tableData);
  }

  loadingOn(): void {
    this._loading.next(true);
  }

  loadingOff(): void {
    this._loading.next(false);
  }
}
