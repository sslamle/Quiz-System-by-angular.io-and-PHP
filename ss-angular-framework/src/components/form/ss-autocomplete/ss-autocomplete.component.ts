import { Component, Input, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ValueAccessorBase, MakeProvider } from '../shared/control-value-accessor';

@Component({
    selector: 'ss-autocomplete',
    templateUrl: './ss-autocomplete.component.html',
    providers: [MakeProvider(SSAutocomplete)]
})
export class SSAutocomplete extends ValueAccessorBase<number> implements OnChanges, OnInit {

    @Input() source = [];   // array {id, name}

    placeholder = '';
    selectChoices = [];
    currentChoiceIndex = 0;
    isOpeningSearch = false;
    searchStr = '';

    constructor(
        // private controlContainer: ControlContainer,
        private elm: ElementRef,
    ) {
        super();
    }

    ngOnInit(): void {
        this.placeholder = this.elm.nativeElement.getAttribute('placeholder');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.source) {
            this.source.forEach(item => {
                item.lowercase = item.name.toLowerCase();
            });
        }
    }

    // Update control view when form model value change
    writeValue(value: any) {
        if (value) {
            for (let i =0; i < this.source.length; i ++) {
                if (this.source[i].id === value) {
                    this.searchStr = this.source[i].name;
                    break;
                }
            }
        }
    }

    updateSelectList(text: string) {
        text = text.toLowerCase();
        this.selectChoices = this.source.filter(item =>{
            return item.lowercase.includes(text);
        });
    }

    // Add event listeners for search input
    onSearchInputKeydown (event) {
        switch(event.which) {
            case 9: // Tab
                // Select item
                if (this.selectChoices) this.selectItem(this.selectChoices[this.currentChoiceIndex]);
                break;
            case 13: // Enter
                // Select item
                if (this.selectChoices) this.selectItem(this.selectChoices[this.currentChoiceIndex]);
                event.preventDefault();
                break;
            case 40: // Down
                if (this.currentChoiceIndex < this.selectChoices.length - 1) {
                this.currentChoiceIndex ++;
                } else {
                this.currentChoiceIndex = 0;
                }
                this.scrollToItem(this.currentChoiceIndex);
                event.preventDefault();
                break;
            case 38: // Up
                if (this.currentChoiceIndex > 0) {
                this.currentChoiceIndex --;
                } else {
                this.currentChoiceIndex = this.selectChoices.length - 1;
                }
                this.scrollToItem(this.currentChoiceIndex);
                event.preventDefault();
                break;
            case 27: // ESC
                this.toggleSearch(false);
                event.preventDefault();
                break;
            default:
                this.updateSelectList(this.searchStr);
        }
    } 

    // Scroll to item in choice list
    scrollToItem (index: number) {
        this.elm.nativeElement.getElementsByClassName('ss-choice-list')[0].scrollTop = index * 42; // 42 is item height
    }

    // Show/Hide search list
    toggleSearch (value: boolean) {
        if (value === undefined) this.isOpeningSearch = !this.isOpeningSearch;
        else this.isOpeningSearch = value;

        if (!this.isOpeningSearch) this.selectChoices = [];

        // this.isInactive = !this.isOpeningSearch;
    }

    clearSearch() {
        this.searchStr = '';
        this.selectChoices = [];
    }

    // Select an item
    selectItem (item: any, $event?:any) {
        if (!item) return;
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this.value = item.id;
        this.searchStr = item.name;
        this.toggleSearch(false);
    }
}