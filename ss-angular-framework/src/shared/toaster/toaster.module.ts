import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { SSToasterService } from './toaster.service';

@NgModule({
  imports: [ToastrModule],
  providers: [SSToasterService],
})
export class SSToasterModule {}