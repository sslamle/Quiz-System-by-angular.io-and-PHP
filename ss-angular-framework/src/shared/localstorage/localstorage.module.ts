import { NgModule, ModuleWithProviders } from '@angular/core';
import { LocalStorageService } from './localstorage.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: []
})
export class LocalStorageModule {
    static forRoot(config: ILocalStorageConfig): ModuleWithProviders {
        return {
            ngModule: LocalStorageModule,
            providers: [
                {
                    provide: LocalStorageService,
                    useFactory: () => {
                        let service = new LocalStorageService();
                        if (config.prefix) service.setPrefix(config.prefix);
                        return service;
                    }
                }
            ]
        }
    }
}

interface ILocalStorageConfig {
    prefix?: string
}