import {  OnInit, Component, Output, EventEmitter } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  logoutClick(){
    this.logout.emit();
  }

}
