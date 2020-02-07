import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/AppUtils';
import { SettingObj } from 'src/app/model/SettingObj';

@Component({
  selector: 'app-download-upload-settings',
  templateUrl: './download-upload-settings.component.html',
  styleUrls: ['./download-upload-settings.component.scss']
})
export class DownloadUploadSettingsComponent implements OnInit {

  settings : string;

  constructor(private appUtils:AppUtils) { }

  ngOnInit() {
    this.settings = this.appUtils.getFromLocalStorage(AppUtils.SETTINGS_OBJ);
  }

  salva(){
    if(this.appUtils.isJsonString(this.settings)){
      let settingsObj = JSON.parse(this.settings);
      this.appUtils.saveInLocalStorage(AppUtils.SETTINGS_OBJ,settingsObj);
      alert("Salvataggio effettuato");
    }
    else{
      alert("La stringa inserita non è in formato JSON corretto");
    }
  }

  reset(){
    if(confirm("Stai per cancellare i settings.")) {
      this.settings = "{}";
      this.appUtils.saveInLocalStorage(AppUtils.SETTINGS_OBJ,JSON.parse(this.settings));
    }
  }

}
