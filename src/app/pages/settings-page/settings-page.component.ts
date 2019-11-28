import { Component, OnInit } from '@angular/core';
import { Container } from 'src/app/model/Container';
import { PortainerService } from 'src/app/services/portainer.service';
import { AppUtils } from 'src/app/utils/AppUtils';
import { ContainerGroup } from 'src/app/model/ContainerGroup';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  containerList : Container[];
  groupsNames : String[];
  groups : ContainerGroup[];
  selectedElement : ContainerGroup;

  constructor(
    private appUtils:AppUtils,
    private portainerServ: PortainerService) { }

  ngOnInit() {
    this.containerList = this.portainerServ.getCachedProxyResp();
    this.reloadGroups();
  }

  reloadGroups(){
    let groupsStr = this.appUtils.getFromLocalStorage(AppUtils.CONTAINER_GROUP_OBJ);
    if(groupsStr != null && groupsStr != ""){
      this.groups = JSON.parse(groupsStr);
      this.groupsNames = this.groups.map(x=>x.name);
    }else{
      this.groups = [];
    }
  }

  onClickedElement(strClickedElement){
    for(let gr of this.groups){
      if(gr.name == strClickedElement){
        this.selectedElement = gr;
        break;
      }
    }
    this.reloadGroups();
  }

  onNewElement(strClickedElement){
    let newGroup = new ContainerGroup();
    newGroup.name=strClickedElement;
    newGroup.containersNames = [];

    this.groups.push(newGroup);
    this.selectedElement = newGroup;
    this.appUtils.saveInLocalStorage(AppUtils.CONTAINER_GROUP_OBJ, JSON.stringify(this.groups));
  }

  onSvuotaListaGruppi(){
    this.appUtils.saveInLocalStorage(AppUtils.CONTAINER_GROUP_OBJ,null);
    this.groupsNames = [];
    this.groups = [];
    this.selectedElement = null;
  }

  onSalvaGruppi(gruppi:ContainerGroup[]){
    console.log("ONSALVAGRUPPI");
    console.log(gruppi);
    this.appUtils.saveInLocalStorage(AppUtils.CONTAINER_GROUP_OBJ,JSON.stringify(gruppi));
  }

}
