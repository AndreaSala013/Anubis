import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input('viewText') viewText : boolean;

  text:string = "Loading";
  interval;

  constructor() { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.text == "Loading..."){
        this.text = "Loading";
      }
      else{
        this.text += ".";
      }
    },500)
  }

}
