import { TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export class TableDataSource<T> extends MatTableDataSource<T> {
  data:Array<any>;
  columnsDefine:Array<IColumnDefine>;
  displayedColumns:Array<string>;

  constructor(tableData:ITableData) {
    super(tableData.data);
    
    this.columnsDefine = tableData.columnsDefine;
    
    if (tableData.displayedColumns) {
      this.displayedColumns = tableData.displayedColumns;     
    } else {
      // Generate displayedColumns from columnsDefine if it is not exist in init data
      this.displayedColumns = tableData.columnsDefine.map(col => col.field);
    }
  }

  update(data?:Array<any>) {
    if (data) {
      this.data = data;
    } else {
      this._updateChangeSubscription();
    }
  }
}

export interface ITableData {
  data:Array<any>;
  columnsDefine:Array<IColumnDefine>;
  displayedColumns?:Array<string>;
}

export interface IColumnDefine {
  label: string,
  field: string,
  template?: TemplateRef<any>,
  isCenter?: boolean
};