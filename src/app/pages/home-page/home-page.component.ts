import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/AppUtils';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  username: string;

  constructor(
    private appUtils:AppUtils,
    private keyServ:KeycloakService,
    private router:Router) { }

  ngOnInit() {
    this.username = this.keyServ.getUsername();
  }

  onLogout(){
    console.log("HOMEPAGE: onLogout");
    this.appUtils.saveInLocalStorage(AppUtils.PORTAINER_TOKENS,null);
    this.keyServ.logout();
    this.router.navigate(['']);
  }
}
