import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableMaterialComponent } from './table-material.component';
import { MatInputModule } from '@angular/material/input';
// import { UtilsModule } from '../../shared/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    // UtilsModule
  ],
  declarations: [ TableMaterialComponent ],
  exports: [ TableMaterialComponent ],
  providers: [  ]
})
export class TableMaterialModule {
  
}
