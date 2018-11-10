import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../services/admin.service';
import { AmbulanceService} from '../../services/ambulance.service';
import { PanicService} from '../../services/panic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    userCount: Number = 0;
    providerCount: Number = 0;
    driverCount: Number = 0;
    ambulanceCount: Number = 0;
    panicCount: Number = 0;

  constructor(
    private adminService: AdminService,
    private ambulanceService: AmbulanceService,
    private panicService: PanicService
    ) { }

  ngOnInit() {
    this.getUserList();
    this.getProviderList();
    this.getDriverList();
    this.getAmbulanceList();
    this.getPanicList();
  }

    getUserList() {
        this.adminService.userList('User').subscribe(
            (data) => {
              if (!data.error) {
                    this.userCount = data.message.length;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getProviderList() {
        this.adminService.userList('Provider').subscribe(
            (data) => {
              console.log(data);
              if (!data.error) {
                    this.providerCount = data.message.length;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getDriverList() {
        this.adminService.userList('Driver').subscribe(
            (data) => {
              console.log(data);
              if (!data.error) {
                    this.driverCount = data.message.length;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getAmbulanceList() {
        this.ambulanceService.ambulanceList().subscribe(
            (data) => {
              console.log(data);
              if (!data.error) {
                    this.ambulanceCount = data.message.length;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getPanicList() {
        this.panicService.panicList().subscribe(
            (data) => {
              console.log(data);
              if (!data.error) {
                    this.panicCount = data.message.length;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }


}
