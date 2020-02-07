import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUtils } from 'src/app/utils/AppUtils';
import { SettingObj, SettingGroup } from 'src/app/model/SettingObj';
import { CheckboxComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-sizing-settings',
  templateUrl: './sizing-settings.component.html',
  styleUrls: ['./sizing-settings.component.scss']
})
export class SizingSettingsComponent implements OnInit {

  @ViewChild('generalCheck', {static: false}) generalCheck: CheckboxComponent;
  @ViewChild('customCheck', {static: false}) customCheck: CheckboxComponent;

  sizeCustom : number;
  expandedCustom : boolean;
  sizeGeneral : number;
  expandedGeneral : boolean;


  constructor(private appUtils:AppUtils) { }

  ngOnInit() {
    let sizGen = AppUtils.GENERAL_GROUP_SIZE;
    let expGen = true;
    let sizCus = AppUtils.CUSTOM_GROUP_SIZE;
    let expCus = true;

    let settingsObj : SettingObj = this.appUtils.getSettingsFromLocalStorage(AppUtils.SETTINGS_OBJ);
    this.sizeGeneral = AppUtils.GENERAL_GROUP_SIZE;
    this.sizeCustom = AppUtils.CUSTOM_GROUP_SIZE;

    if(settingsObj.generalGroup != null ){
      if(settingsObj.generalGroup.size != null){
        sizGen = settingsObj.generalGroup.size;
      }
      if(settingsObj.generalGroup.expanded != null){
        expGen = settingsObj.generalGroup.expanded;
      }
    }

    if(settingsObj.customGroups != null){
      if(settingsObj.customGroups.size != null){
        sizCus = settingsObj.customGroups.size;
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

  ngAfterViewInit() {
    this.generalCheck.checked = this.expandedGeneral;
    this.customCheck.checked = this.expandedCustom;
  }

  salvaSize(){
    let errore : boolean = false;

    if(this.sizeCustom == null || this.sizeCustom < 50){
      errore = true;
      alert("Size custom errato (nullo o minore di 50)");
    }

    if(this.sizeGeneral == null || this.sizeGeneral < 50){
      errore = true;
      alert("Size general errato (nullo o minore di 50)");
    }

    if(!errore){
      this.appUtils.saveSettingsInLocalStorage(AppUtils.SETTINGS_OBJ, this.createCustomConfig(false), this.createGeneralConfig(false));
      alert("Salvataggio effettuato");
    }
  }

  resetSettings(){
    if(confirm("Stai per ripristinare i setting di default di default.")) {
      this.sizeCustom = AppUtils.CUSTOM_GROUP_SIZE;
      this.sizeGeneral = AppUtils.GENERAL_GROUP_SIZE;
      this.appUtils.saveSettingsInLocalStorage(AppUtils.SETTINGS_OBJ,  this.createCustomConfig(true), this.createGeneralConfig(true));
    }
  }

  createCustomConfig(defualt:boolean):SettingGroup{
    let x = new SettingGroup;
    if(defualt){
      x.size = AppUtils.CUSTOM_GROUP_SIZE;
      x.expanded = true;
    }
    else{
      x.size = this.sizeCustom;
      x.expanded = this.customCheck.checked;
    }
    return x;
  }

  createGeneralConfig(defualt:boolean):SettingGroup{
    let x = new SettingGroup;
    if(defualt){
      x.size = AppUtils.GENERAL_GROUP_SIZE;
      x.expanded = true;
    }else{
      x.size = this.sizeGeneral;
      x.expanded = this.generalCheck.checked;
    }
    return x;
  }

  
}
