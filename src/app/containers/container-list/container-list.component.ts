import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Container } from 'src/app/model/Container';
import { PortainerService } from 'src/app/services/portainer.service';
import { AppUtils } from 'src/app/utils/AppUtils';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  _containerList : Container[];

  @Input('containerList') 
  set containerList(value: Container[]){
    this._containerList = value;
    this.axeptaContainers  = [];
    this.ingContainers  = [];
    this.riverContainers = [];
    this.generalContainers  = [];
    this.popsoContainers = [];
    this._containerList.forEach(element => {
      if(element.name.includes("axepta")){
        this.axeptaContainers.push(element);
      }
      else if(element.name.includes("ing")){
        this.ingContainers.push(element);
      }
      else if(element.name.includes("river")){
        this.riverContainers.push(element);
      }
      else if(element.name.includes("popso")){
        this.popsoContainers.push(element);
      }
      else{
        this.generalContainers.push(element);
      }
    });
  }

  axeptaContainers : Container[] = [];
  ingContainers : Container[] = [];
  riverContainers : Container[] = [];
  popsoContainers : Container[] = [];
  generalContainers : Container[] = [];

  showAxepta = true;
  showIng = true;
  showRiver = true;
  showPopso = true;
  showGeneral = true;

  isLoading: boolean;

  constructor(
    private appUtils:AppUtils,
    private portServ:PortainerService) { }

  ngOnInit() {
  }


  async onNewContainerState(container:Container){
    this.isLoading = true;
    let newState : string;
    let resp;
    if(container.status == AppUtils.CONTAINER_RUNNING){
      newState = AppUtils.CONTAINER_EXITED;
      resp = await this.portServ.stopContainer(this.appUtils.getFromLocalStorage(AppUtils.PORTAINER_TOKENS),container.id);
    }
    else if(container.status == AppUtils.CONTAINER_EXITED){
      newState = AppUtils.CONTAINER_RUNNING;
      resp = await this.portServ.startContainer(this.appUtils.getFromLocalStorage(AppUtils.PORTAINER_TOKENS),container.id);
    }
    console.log(resp);
    if(resp == null || ( resp.status != 200 && resp.status != 204)){
      alert("Operazione non riuscita");
    }else{
      this.containerList.forEach(element=>{
        if(element.id == container.id){
          console.log(newState);
          element.status = newState;
        }
      });
    }
    this.isLoading = false;
  }

}
