import { Directive, Input, ElementRef, OnDestroy, AfterContentInit } from '@angular/core';

@Directive({ selector: '[fixTableHeader]' })
export class FixTableHeaderDirective implements OnDestroy, AfterContentInit {

    @Input() offsetFromElement: string;
    elementOffsetFrom: any;
    element: any;

    constructor(
        private elm: ElementRef
    ) {
        
    }

    ngAfterContentInit(): void {
        this.elementOffsetFrom = this.offsetFromElement ?
                document.querySelector(this.offsetFromElement) :
                window;
        this.element = this.elm.nativeElement;
       
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    }

    private onResize = () => {

            let thead = this.element.querySelector('thead');
            
            let thElements = this.element.getElementsByTagName('th');
            let tdElements = this.element.getElementsByTagName('td');
            let totalWidth = 0;
            for (let i = 0; i < thElements.length; i++) {
                let tdElement = tdElements[i];
                if (!tdElement) {
                    return;
                }
                let tdElementWidth = tdElement.offsetWidth;
                thElements[i].style.width = tdElementWidth + 'px';
                tdElement.style.width = tdElementWidth + 'px';
                totalWidth += tdElementWidth;
            }

            thead.style.width = totalWidth + 'px';


    }

    private bindFixedToHeader() {
        let thead = this.element.querySelector('thead'),
            tbody = this.element.querySelector('tbody'),
            tbodyLeftPos = tbody.getBoundingClientRect().left,
            firstTr = tbody.querySelector('tr');
        thead.classList.add('fixed-header');
        if (this.offsetFromElement) {
            let topElement = <any>document.querySelector(this.offsetFromElement);
            let offset = topElement.getBoundingClientRect().top + topElement.offsetHeight;
            thead.style.top = offset + 'px';
        }
        thead.style.left = tbodyLeftPos + 'px';
        tbody.classList.add('tbody-offset');

        if (firstTr && !firstTr.style.height) {
            firstTr.style.height = (firstTr.offsetHeight + thead.offsetHeight) + 'px';
        }
    }

    private unBindFixedToHeader() {
        let thead = this.element.querySelector('thead'),
            tbody = this.element.querySelector('tbody'),
            firstTr = tbody.querySelector('tr');
        thead.classList.remove('fixed-header');
        thead.style.left =  '';
        thead.style.top = '';
        tbody.classList.remove('tbody-offset');
        if (firstTr) {
            firstTr.style.height = '';
        }
    }

    private onScroll = () => {
        let offset = this.offsetFromElement ?
                this.elementOffsetFrom.getBoundingClientRect().top + this.elementOffsetFrom.offsetHeight :
                window.pageYOffset,
            tableOffsetTop = this.offsetFromElement ?
                this.element.getBoundingClientRect().top :
                this.element.getBoundingClientRect().top + offset,
            tableOffsetBottom = tableOffsetTop + this.element.offsetHeight - this.element.querySelector('thead').offsetHeight;

        this.onResize();
        tableOffsetTop += 20;
        if (offset < tableOffsetTop || offset > tableOffsetBottom) {
            // console.log('unbind', offset, tableOffsetTop, tableOffsetBottom);
            this.unBindFixedToHeader();
        }
        else if (offset >= tableOffsetTop && offset <= tableOffsetBottom) {
            // console.log('bind', offset, tableOffsetTop, tableOffsetBottom);
            this.bindFixedToHeader();            
        }
    }
}