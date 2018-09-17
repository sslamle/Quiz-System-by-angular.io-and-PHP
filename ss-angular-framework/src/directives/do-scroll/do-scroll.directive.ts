import { Directive, ElementRef, AfterContentInit } from '@angular/core';

// Trigger a fake scroll on element (For perfect scroll bar with dynamic height)
@Directive({ selector: '[doScroll]' })
export class DoScrollDirective implements AfterContentInit{

    constructor(
        public el: ElementRef
    ) {
    }

    ngAfterContentInit(): void {
        setTimeout(() => {
            this.el.nativeElement.scrollTo(0, 3);
            this.el.nativeElement.scrollTo(0, 0);
        }, 500);
    }
}