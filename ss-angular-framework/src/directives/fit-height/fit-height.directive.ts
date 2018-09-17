import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({ selector: '[fitHeight]' })
export class FitHeightDirective implements AfterContentInit{

    constructor(
        public el: ElementRef
    ) {
    }

    ngAfterContentInit(): void {
        let documentHeight = document.documentElement.clientHeight;
        let bound = this.el.nativeElement.getBoundingClientRect();
        
        this.el.nativeElement.style.height = (documentHeight - bound.top - 16) + 'px';
    }
}