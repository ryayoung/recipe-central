import {Component, OnInit} from '@angular/core';
import {About} from "../../components/interfaces/About";
import shared from '../app.constants';

@Component({
    selector: 'about',
    templateUrl: './about.html',
    styleUrls: ['./about.scss'],
})
export class AboutComponent implements OnInit {
    public aboutMe: About;

    static parameters = [];
    constructor() {
        this.aboutMe = shared.aboutMe;
    }

    ngOnInit() {
    }
}
