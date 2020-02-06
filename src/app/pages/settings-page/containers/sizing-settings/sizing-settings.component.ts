import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/AppUtils';
import { SettingObj } from 'src/app/model/SettingObj';

@Component({
  selector: 'app-sizing-settings',
  templateUrl: './sizing-settings.component.html',
  styleUrls: ['./sizing-settings.component.scss']
})
export class SizingSettingsComponent implements OnInit {

  sizeCustom : number;
  sizeGeneral : number;

  constructor(private appUtils:AppUtils) { }

  ngOnInit() {
    let settingsObj : SettingObj = this.appUtils.getSettingsFromLocalStorage(AppUtils.SETTINGS_OBJ);

    if(settingsObj.sizeGenerali != null){
      this.sizeGeneral = settingsObj.sizeGenerali;
    }else{
      this.sizeGeneral = AppUtils.GENERAL_GROUP_SIZE;
    }

    if(settingsObj.sizeGroups != null){
      this.sizeCustom = settingsObj.sizeGroups;
    }else{
      this.sizeCustom = AppUtils.CUSTOM_GROUP_SIZE;
    }
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
      this.appUtils.saveSizeInLocalStorage(AppUtils.SETTINGS_OBJ, this.sizeCustom, this.sizeGeneral);
      alert("Salvataggio effettuato");
    }
  }

  resetSize(){
    if(confirm("Stai per ripristinare le dimensioni di default.")) {
      this.sizeCustom = AppUtils.CUSTOM_GROUP_SIZE;
      this.sizeGeneral = AppUtils.GENERAL_GROUP_SIZE;
      this.appUtils.saveSizeInLocalStorage(AppUtils.SETTINGS_OBJ, this.sizeCustom, this.sizeGeneral);
    }
  }
}
