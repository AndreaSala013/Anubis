import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input('title') title:string;
  @Input('contentHidden') contentHidden:boolean;
  sign : string;

  constructor() { }

  ngOnInit() {
    this.changeSign();
  }

  onClick(){
    this.contentHidden = !this.contentHidden;
    this.changeSign();
  }

  changeSign(){
    this.sign = this.contentHidden ? "+" : "-";   
  }
}
