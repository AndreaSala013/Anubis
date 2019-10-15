import {  OnInit, Component } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private keycloakServ:KeycloakService, private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.keycloakServ.logout();
    this.router.navigate(['/']);
  }

}
