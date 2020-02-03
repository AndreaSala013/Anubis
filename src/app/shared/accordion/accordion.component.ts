import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('showBody', [
      state('show', style({
      transition:"height 0.35s ease",
      overflow:"hidden"
      })),
      state('hide',   style({
        height:"0",
      transition:"height 0.35s ease",
      overflow:"hidden"
      })),
      transition('show => hide', animate('0.3s ease-out')),
      transition('hide => show', animate('0.3s ease-in'))
    ])
  ]
})
export class AccordionComponent implements OnInit {

  @Input('title') title:string;
  @Input('contentHidden') contentHidden:boolean;
  sign : string;

  constructor() { }

  ngOnInit() {
    this.changeSign();
  }

  get stateName() {
    return !this.contentHidden ? 'show' : 'hide'
  }

  onClick(){
    this.contentHidden = !this.contentHidden;
    this.changeSign();
  }

  changeSign(){
    this.sign = this.contentHidden ? "+" : "-";   
  }
}
