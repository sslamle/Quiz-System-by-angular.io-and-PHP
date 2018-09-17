import { Component, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy  } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { TableDataSource } from './table-data-source';
// import { UtilsService } from '../../shared/utils/utils.service';

@Component({
  selector: 'table-material', // <yardi-table-material></yardi-table-material>
  templateUrl: './table-material.component.html',
})
export class TableMaterialComponent implements OnChanges, OnDestroy {

  @Input() tableData:TableDataSource<any>;
  @Input() searchText:string;
  @Output() rowClick = new EventEmitter<any>();

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private searchTimer:any;

  constructor(
    // private utils: UtilsService
  ) {
    
  }

  onRowClick(row: any) {
    this.rowClick.emit(row)
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.tableData.sort = this.sort;
    this.tableData.paginator = this.paginator;
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchText) {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.tableData.filter = changes.searchText.currentValue;
      }, 200);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.searchTimer);
  }
}