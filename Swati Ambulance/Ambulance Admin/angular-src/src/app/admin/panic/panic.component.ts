import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PanicService} from '../../services/panic.service';
import { AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin-panic',
  templateUrl: './panic.component.html',
  styleUrls: ['./panic.component.css'],
})
export class AdminPanicComponent implements OnInit {

    constructor() {}
    ngOnInit() {}
}

@Component({
  selector: 'app-admin-panic-list',
  templateUrl: './paniclist.component.html',
  styleUrls: ['./panic.component.css'],
})
export class PanicListComponent implements OnInit {
    panics: any = [];
    panicsCopy: any = [];
    providers: any = [];
    returnUrl: string;
    err: any;
    p: number[] = [];
    pageSize = 10;
    txtfilter: string;
    providerFilter = 'All Providers';
    key = 'user.firstname';
    reverse = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(
        private lf: FormBuilder,
        private panicService: PanicService,
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.getList();
    }


    getList() {
        this.panicService.panicList().subscribe(
            (data) => {
                console.log(data);
              if (!data.error) {
                     this.panics = data.message;
                     this.panicsCopy = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }


    private deletePanic(id) {
        if (confirm('Are you sure to delete ?')) {
            this._flashMessagesService.show('Panic Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.panicService.panicDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}



