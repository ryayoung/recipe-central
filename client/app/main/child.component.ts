import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'child',
    template: '<h4>{{name}}</h4><br><button (click)="clicked($event)">Child Button</button>'
})


export class ChildComponent {

    @Input() name: string;
    @Output() selected = new EventEmitter<boolean>();

    static parameters = [];

    constructor() { }

    private clicked($event) {
        this.selected.emit(true);
    }

}


