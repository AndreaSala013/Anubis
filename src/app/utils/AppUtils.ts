import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class AppUtils{
    public static PORTAINER_TOKENS = "PortainerToken";
    public static CONTAINER_RUNNING = "running";
    public static CONTAINER_EXITED = "exited";
    public static PORTAINER_INVALID_TOKEN = "Invalid JWT token";
    public static FILTER_ATTRIBUTE = "filter";


    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService){

    }

    public saveInLocalStorage(key:string, value){
        console.log("APPUTILS:saveInLocalStorage");
        console.log(key);
        console.log(value);
        this.storage.set(key, value);
    }

    public getFromLocalStorage(key):string{
        console.log("APPUTILS:getFromLocalStorage");
        console.log(key);
        return this.storage.get(key);
    }

    public isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}