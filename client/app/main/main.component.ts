import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'main',
    templateUrl: './main.html',
    styleUrls: ['./main.scss'],
})
export class MainComponent implements OnInit {

    private values: string[];
    private input: string;
    static parameters = [HttpClient];
    constructor(private http: HttpClient) {
        this.http = http;
        this.values = ["fist", "second", "third"];
    }

    ngOnInit() {
    }

}
