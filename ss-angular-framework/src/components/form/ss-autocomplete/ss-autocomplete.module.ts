import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SSAutocomplete } from './ss-autocomplete.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [ SSAutocomplete ],
  exports: [ SSAutocomplete ],
  providers: [  ]
})
export class SSAutocompleteModule {
  
}
