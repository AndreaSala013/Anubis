import { Component, OnInit, Input } from '@angular/core';
import { Container } from 'src/app/model/Container';
import { PortainerService } from 'src/app/services/portainer.service';
import { AppUtils } from 'src/app/utils/AppUtils';
import { ContainerGroup } from 'src/app/model/ContainerGroup';
import { FormControl } from '@angular/forms';
import { SettingObj } from 'src/app/model/SettingObj';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  private _containerList : Container[]
  @Input('containerList') 
  set containerList(value: Container[]){
    this._containerList = value;
    this.checkLocalStorageForGroups();
    this.groupsToDisplay = new Map();
    this.groupsVisibile = new Map();
    this.generalContainers = [];
    console.log(this.groupsFromLocalStorage);
    if(this.groupsFromLocalStorage != null && this.groupsFromLocalStorage.length > 0){
      for(let cont of this._containerList){
        let groupName = null;
        for(let gr of this.groupsFromLocalStorage){
          if(gr.containersNames.includes(cont.name)){
            groupName = gr.name;
            break;
          }
        }
        if(groupName == null){
          this.generalContainers.push(cont);
        }else{
          if(!this.groupsToDisplay.has(groupName)){
            this.groupsToDisplay.set(groupName, []);
            this.groupsVisibile.set(groupName, true);
          }
          this.groupsToDisplay.get(groupName).push(cont);
        }
      }
    }else{
      this._containerList.forEach(element => {
        this.generalContainers.push(element);
      });
    }

    if(this.groupsToDisplay != null && this.groupsToDisplay.size>1){
      this.useCol6=true;
    }else{
      this.useCol6=false;
    }
  }

  useCol6 : boolean = false;

  groupsFromLocalStorage : ContainerGroup[];
  groupsToDisplay : Map<string,Container[]>;
  groupsVisibile : Map<string, boolean>;
  generalContainers : Container[] = [];
  showGeneral = true;

  isLoading: boolean;

  sizeCustom : string;
  expandedCustom : boolean;

  sizeGeneral : string;
  expandedGeneral : boolean;

  constructor(
    private appUtils:AppUtils,
    private portServ:PortainerService) { }

  ngOnInit() {
    this.setSizing();
  }

  setSizing(){
    let settingsObj : SettingObj = this.appUtils.getSettingsFromLocalStorage(AppUtils.SETTINGS_OBJ);

    console.log(settingsObj);

    let sizGen = AppUtils.GENERAL_GROUP_SIZE + "px";
    let expGen = true;
    let sizCus = AppUtils.CUSTOM_GROUP_SIZE + "px";
    let expCus = true;

    if(settingsObj.generalGroup != null ){
      if(settingsObj.generalGroup.size != null){
        sizGen = settingsObj.generalGroup.size + "px";
      }
      if(settingsObj.generalGroup.expanded != null){
        expGen = settingsObj.generalGroup.expanded;
      }
    }

    if(settingsObj.customGroups != null){
      if(settingsObj.customGroups.size != null){
        sizCus = settingsObj.customGroups.size + "px";
      }
      if(settingsObj.customGroups.expanded != null){
        expCus = settingsObj.customGroups.expanded
      }
    }

    this.sizeGeneral = sizGen;
    this.expandedGeneral = expGen;
    this.sizeCustom = sizCus;
    this.expandedCustom = expCus;
  }

  checkLocalStorageForGroups(){
    let groupsObj = this.appUtils.getGroupsFromLocalStorage(AppUtils.SETTINGS_OBJ);
    //let groupsStr = '[{"name":"Axepta", "containersNames":["axepta-dcode-prod","axepta-dcode-developer"]},{"name":"Ubi", "containersNames":["ubi-river-x-online"]}]';
    if(groupsObj != null && groupsObj.length>0){
      this.groupsFromLocalStorage = groupsObj;
    }
  }

  async onNewContainerState(container:Container){
    this.isLoading = true;
    let newState : string;
    let resp;
    if(container.status == AppUtils.CONTAINER_RUNNING){
      newState = AppUtils.CONTAINER_EXITED;
      resp = await this.portServ.stopContainer(this.appUtils.getGroupsFromLocalStorage(AppUtils.PORTAINER_TOKENS),container.id);
    }
    else if(container.status == AppUtils.CONTAINER_EXITED){
      newState = AppUtils.CONTAINER_RUNNING;
      resp = await this.portServ.startContainer(this.appUtils.getGroupsFromLocalStorage(AppUtils.PORTAINER_TOKENS),container.id);
    }
    console.log(resp);
    if(resp == null || ( resp.status != 200 && resp.status != 204)){
      alert("Operazione non riuscita");
    }else{
      this._containerList.forEach(element=>{
        if(element.id == container.id){
          console.log(newState);
          element.status = newState;
        }
      });
    }
    this.isLoading = false;
  }

}
