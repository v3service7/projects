import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-frontend",
  templateUrl: "./frontend.component.html",
  styleUrls: ["./frontend.component.css"]
})
export class FrontendComponent implements OnInit {
	
  constructor(public router: Router) {}

  ngOnInit() {
   
  }
}
