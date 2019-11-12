import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { KeycloakService } from './services/keycloak.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ContainerListItemComponent } from './components/container-list-item/container-list-item.component';
import { ContainerListComponent } from './containers/container-list/container-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TestComponent } from './test/test/test.component';

export function kcFactory(keycloakService: KeycloakService) {
  console.log("kcFACTORY");
  return () => keycloakService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    LoaderComponent,
    ContainerListItemComponent,
    ContainerListComponent,
    TestComponent
  ],
  imports: [
    StorageServiceModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
