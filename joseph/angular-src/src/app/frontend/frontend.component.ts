import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-frontend",
  templateUrl: "./frontend.component.html",
  styleUrls: ["./frontend.component.css"]
})
export class FrontendComponent implements OnInit {
  checkUrl: any;
  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUrl = this.router.url;
    console.log(this.checkUrl)
  }
}
