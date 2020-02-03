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
  selectedContainers : String[];
  blockedContainers : String[];

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
    this.reloadContainerList();

    console.log(this.selectedContainers);
    console.log(this.blockedContainers);
  }

  reloadContainerList(){
    this.selectedContainers = [];
    this.selectedContainers = this.selectedElement.containersNames;

    this.blockedContainers = [];
    this.groups.forEach(gr=>{
      if(gr.name != this.selectedElement.name){
        gr.containersNames.forEach(cont=>{
          this.blockedContainers.push(cont);
        });
      }
    });
  }

  onNewElement(strClickedElement){
    console.log("ONNEWELEMENT");
    let newGroup = new ContainerGroup();
    newGroup.name=strClickedElement;
    newGroup.containersNames = [];

    this.groups.push(newGroup);
    this.selectedElement = newGroup;
    this.appUtils.saveInLocalStorage(AppUtils.CONTAINER_GROUP_OBJ, JSON.stringify(this.groups));
    this.onClickedElement(strClickedElement);
  }

  onSvuotaListaGruppi(){
    if(confirm("Stai per cancellare tutti i gruppi in modo permanente.")) {
      console.log("Implement delete functionality here");
      this.appUtils.saveInLocalStorage(AppUtils.CONTAINER_GROUP_OBJ,null);
      this.groupsNames = [];
      this.groups = [];
      this.selectedElement = null;
    }
  }

  onSalvaGruppi(gruppi:ContainerGroup[]){
    console.log("ONSALVAGRUPPI");
    console.log(gruppi);
    this.appUtils.saveInLocalStorage(AppUtils.CONTAINER_GROUP_OBJ,JSON.stringify(gruppi));
    alert("Salvataggio effettuato.");
  }

  onRemoveGruppo(gruppi:ContainerGroup[]){
    console.log("ONREMOVEGRUPPO");
    this.onSalvaGruppi(gruppi);

    this.selectedElement = null;
    this.reloadGroups();
    this.reloadContainerList();
  }
}
