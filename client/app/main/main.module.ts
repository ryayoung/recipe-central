import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';
import { ChildComponent } from './child.component';

import {UserService} from '../../components/services/user.service';
import {SquarePipe} from '../../components/pipes/square.pipe';
import {AboutModule} from '../about/about.module';

export const ROUTES: Routes = [
    { path: 'home', component: MainComponent },
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),

        TooltipModule.forRoot(),
    ],
    declarations: [
        MainComponent,
        ChildComponent,
        SquarePipe,
    ],

    exports: [
        MainComponent,
        ChildComponent,
    ],

    providers: [
        UserService,
    ]
})
export class MainModule {}
