import { Component, OnInit } from '@angular/core';

import { Container } from 'src/app/model/Container';
import { ContainerGroup } from 'src/app/model/ContainerGroup';
import { AppUtils } from 'src/app/utils/AppUtils';
import { PortainerService } from 'src/app/services/portainer.service';
import { SettingObj } from 'src/app/model/SettingObj';

@Component({
  selector: 'app-groups-settings',
  templateUrl: './groups-settings.component.html',
  styleUrls: ['./groups-settings.component.scss']
})
export class GroupsSettingsComponent implements OnInit {

  containerList : Container[];
  groupsNames : String[];
  groups : ContainerGroup[];
  
  selectedElement : ContainerGroup;
  selectedContainers : String[];
  blockedContainers : String[];

  constructor(
    private appUtils:AppUtils,
    private portainerServ: PortainerService){ }

  ngOnInit() {
    this.containerList = this.portainerServ.getCachedProxyResp();
    this.reloadGroups();
  }

  reloadGroups(){
    let settingsObj = this.appUtils.getGroupsFromLocalStorage(AppUtils.SETTINGS_OBJ);
    if(settingsObj !=null && settingsObj.length > 0){
      this.groups = settingsObj;
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
    this.appUtils.saveGroupsInLocalStorage(AppUtils.SETTINGS_OBJ, this.groups);
    this.onClickedElement(strClickedElement);
  }

  onSvuotaListaGruppi(){
    if(confirm("Stai per cancellare tutti i gruppi in modo permanente.")) {
      console.log("Implement delete functionality here");
      this.appUtils.saveGroupsInLocalStorage(AppUtils.SETTINGS_OBJ,null);
      this.groupsNames = [];
      this.groups = [];
      this.selectedElement = null;
    }
  }

  onSalvaGruppi(gruppi:ContainerGroup[]){
    console.log("ONSALVAGRUPPI");
    console.log(gruppi);
    this.appUtils.saveGroupsInLocalStorage(AppUtils.SETTINGS_OBJ,gruppi);
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
