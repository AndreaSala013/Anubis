import { Component, OnInit, Input } from '@angular/core';
import { Container } from 'src/app/model/Container';
import { concatAll } from 'rxjs/operators';

@Component({
  selector: 'app-container-list-item',
  templateUrl: './container-list-item.component.html',
  styleUrls: ['./container-list-item.component.scss']
})
export class ContainerListItemComponent implements OnInit {

  
hover : boolean = false;

@Input('container') container:Container;

isPlayVisible: boolean = false; 
isStopVisible : boolean = false;

constructor() { }

ngOnInit() {
  if(this.container.status == "running"){
    this.isStopVisible = true;
  }
}

buttonPlayClick(){
  this.isStopVisible = true;
  this.isPlayVisible = false;
}

buttonStopClick(){
  this.isStopVisible = false;
  this.isPlayVisible = true;
}


  public stopPropagationHover(event: any): void
  {
    this.hover=false;
    event.stopPropagation();
  }


}
