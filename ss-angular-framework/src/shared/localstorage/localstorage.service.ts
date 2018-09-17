import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  prefix:string = 'ss_';

  setPrefix (prefix: string) {
    this.prefix = `ss_${prefix}_`;
  }

  set (key:string, value:any) {
    window.localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  get (key:string) {
    return JSON.parse(window.localStorage.getItem(this.prefix + key));
  }

  remove (key:string) {
    window.localStorage.removeItem(this.prefix + key);
  }

  clearAllReg(reg : RegExp) {
    Object.keys(window.localStorage).forEach(key => {
      if (reg.test(window.localStorage[key])) {
        this.remove(key);
      }
    });
  }
}