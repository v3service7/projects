// import { Component, OnInit } from '@angular/core';
import { Component, Input,OnInit } from '@angular/core';
//import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: []
})
export class ConfirmationDialogComponent implements OnInit {

// constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) {}
 constructor() {}
  public confirmMessage:string;

  ngOnInit() {

  }

}

