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

  constructor(private portServ:PortainerService) { }

  ngOnInit() {

  }

  onNewContainerState(container:Container){
    if(container.status == AppUtils.CONTAINER_RUNNING){
      this.portServ.stopContainer(container.id);
    }
    else if(container.status == AppUtils.CONTAINER_EXITED){
      this.portServ.startContainer(container.id);
    }
  }

}
