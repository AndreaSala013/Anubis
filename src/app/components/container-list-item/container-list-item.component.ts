import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Container } from 'src/app/model/Container';
import { concatAll } from 'rxjs/operators';
import { AppUtils } from 'src/app/utils/AppUtils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-container-list-item',
  templateUrl: './container-list-item.component.html',
  styleUrls: ['./container-list-item.component.scss']
})
export class ContainerListItemComponent implements OnInit {

@Input('container') container:Container;
@Output() newState = new EventEmitter<Container>();

hover : boolean = false;
isPlayVisible: boolean = false; 
isStopVisible : boolean = false;

constructor() { }

ngOnInit() {
  if(this.container.status == AppUtils.CONTAINER_RUNNING){
    this.isStopVisible = true;
    this.isPlayVisible = false;
  }
  if(this.container.status == AppUtils.CONTAINER_EXITED){
    this.isStopVisible = false;
    this.isPlayVisible = true;
  }
}

buttonActionClick(){
  this.newState.emit(this.container);
}



stopPropagationHover(event: any): void
{
  this.hover=false;
  event.stopPropagation();
}


onClickItem(){
  window.open(environment.dastanUrl+this.container.name+"/");
}

}
