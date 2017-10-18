import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
    	this.message = this.alertService.getMessage();
    }
}
