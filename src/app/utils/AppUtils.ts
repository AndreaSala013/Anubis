import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { SettingObj } from '../model/SettingObj';
import { ContainerGroup } from '../model/ContainerGroup';

@Injectable({
    providedIn: 'root',
  })
export class AppUtils{
    public static PORTAINER_TOKENS = "PortainerToken";
    public static CONTAINER_RUNNING = "running";
    public static CONTAINER_EXITED = "exited";
    public static PORTAINER_INVALID_TOKEN = "Invalid JWT token";
    public static FILTER_ATTRIBUTE = "Filter";
    public static USERNAME_ATTRIBUTE = "preferred_username";
    public static SETTINGS_OBJ = "settings_obj";
    public static CUSTOM_GROUP_SIZE = 240;
    public static GENERAL_GROUP_SIZE = 1650;


    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService){

    }

    public getFromLocalStorage(key):string{
        console.log("APPUTILS:getFromLocalStorage");
        console.log(key);
        return this.storage.get(key);
    }

    public saveInLocalStorage(key:string, value){
        console.log("APPUTILS:saveInLocalStorage->" + "key:"+key+";value:"+value);
        this.storage.set(key, JSON.stringify(value));
    }

    public saveSizeInLocalStorage(key:string, sizeCustom:number, sizeGeneral:number){
        console.log("APPUTILS:saveSizeInLocalStorage->key : " + key);
        let settingsObj : SettingObj = this.getSettingsFromLocalStorage(key);
        settingsObj.sizeGroups = sizeCustom;
        settingsObj.sizeGenerali = sizeGeneral;
        this.storage.set(key, JSON.stringify(settingsObj));
    }

    public saveGroupsInLocalStorage(key:string, value){
        console.log("APPUTILS:saveGroupsInLocalStorage->" + "key:"+key+";value:"+value);
        let settingsObj : SettingObj = this.getSettingsFromLocalStorage(key);
        settingsObj.groups = value;
        this.storage.set(key, JSON.stringify(settingsObj));
    }

    public getSettingsFromLocalStorage(key:string):SettingObj{
        console.log("APPUTILS:getSettingsFromLocalStorage->" + "key:"+key);
        let settingsObj : SettingObj;
        let settingsStr = this.getFromLocalStorage(key);
        if(settingsStr != null && settingsStr != ""){
            settingsObj = JSON.parse(settingsStr);
        }else{
            settingsObj = new SettingObj();
        }
        return settingsObj;
    }

    public getGroupsFromLocalStorage(key):ContainerGroup[]{
        console.log("APPUTILS:getGroupsFromLocalStorage->key:"+key);
        let settingsStr = this.getFromLocalStorage(key);
        if(settingsStr!=null && settingsStr!=""){
            let settingsObj : SettingObj = JSON.parse(settingsStr);
            return settingsObj.groups;
        }
        return null;
    }

    public isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    public removeDoubleQuotes(str:string):string{
        if(str!=null && str != "" && str.charAt(0)=="\"" && str.charAt(str.length-1)=="\""){
            str = str.slice(1,-1);
        }
        return str;
    }
}