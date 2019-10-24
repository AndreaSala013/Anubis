import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppUtils } from '../utils/AppUtils';
import { isUndefined } from 'util';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }

  private keycloakAuth: any;
init(): Promise<any> {
 return new Promise((resolve, reject) => {
    this.keycloakAuth = new Keycloak(environment.keycloakConfig);
    this.keycloakAuth.init({ onLoad: 'login-required' })
      .success(() => {
        resolve();
      })
      .error(() => {
        reject();
      });
    });
}
getToken(): string {
  console.log("getToken");
  //console.log(this.keycloakAuth.tokenParsed["axepta"]);
  return this.keycloakAuth.token;
}

getFilter(): string{
  console.log("getFiltern");
  console.log(this.keycloakAuth.tokenParsed);
  let filter = this.keycloakAuth.tokenParsed[AppUtils.FILTER_ATTRIBUTE];
  if(isUndefined(filter)){
    filter = null;
  }
  return filter;
}

logout(){
  this.keycloakAuth.logout();
}

}
