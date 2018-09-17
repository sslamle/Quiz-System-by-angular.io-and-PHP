import { forwardRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export class ValueAccessorBase<T> implements ControlValueAccessor {
    public innerValue: T;

    private changed = new Array<(value: T) => void>();
    private touched = new Array<() => void>();
    public matcher = new MyErrorStateMatcher();

    // Value of the control: Change this value to update ngModel value
    get value(): T {
        return this.innerValue;
    }

    set value(value: T) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    touch() {
        this.touched.forEach(f => f());
    }

    writeValue(value: T) {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: T) => void) {
        this.changed.push(fn);
    }

    registerOnTouched(fn: () => void) {
        this.touched.push(fn);
    }

}

export function MakeProvider(type : any){
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => type),
      multi: true
    };
  }