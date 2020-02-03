import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  username: string;

  constructor(
    private keyServ:KeycloakService) { }

  ngOnInit() {
    this.username = this.keyServ.getUsername();

  }
}
