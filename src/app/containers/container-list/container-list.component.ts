import { Component, OnInit, Input } from '@angular/core';
import { Container } from 'src/app/model/Container';
import { PortainerService } from 'src/app/services/portainer.service';
import { AppUtils } from 'src/app/utils/AppUtils';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  @Input('containerList') containerList : Container[];

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

  orderBy(prop: string) {
    return this.containerList.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

}
