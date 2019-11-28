import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppUtils } from 'src/app/utils/AppUtils';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input("username") username : string;
  
  constructor(
    private appUtils:AppUtils,
    private keyServ:KeycloakService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  logoutClick(){
    console.log("HOMEPAGE: onLogout");
    this.appUtils.saveInLocalStorage(AppUtils.PORTAINER_TOKENS,null);
    this.keyServ.logout();
    this.router.navigate(['']);
  }

  reloadAnubis(){
    location.replace("Home");
  }

}
