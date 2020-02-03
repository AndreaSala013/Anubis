import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { KeycloakService } from './services/keycloak.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ContainerListItemComponent } from './components/container-list-item/container-list-item.component';
import { ContainerListComponent } from './containers/container-list/container-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TestComponent } from './test/test/test.component';
import { ConsolePageComponent } from './pages/console-page/console-page.component';
import { ContainerPageComponent } from './pages/container-page/container-page.component';
import { RouteReuseStrategy } from '@angular/router';
import { CacheRouteReuseStrategy } from './utils/CacheRouteReuse.strategy';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ClickableListComponent } from './containers/clickable-list/clickable-list.component';
import { CheckboxListComponent } from './containers/checkbox-list/checkbox-list.component';
import { AccordionComponent } from './shared/accordion/accordion.component';

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
    TestComponent,
    ConsolePageComponent,
    ContainerPageComponent,
    SidemenuComponent,
    SettingsPageComponent,
    ClickableListComponent,
    CheckboxListComponent,
    AccordionComponent
  ],
  imports: [
    StorageServiceModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
