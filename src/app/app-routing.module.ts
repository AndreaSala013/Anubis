import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestComponent } from './test/test/test.component';
import { ConsolePageComponent } from './pages/console-page/console-page.component';
import { ContainerPageComponent } from './pages/container-page/container-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { GroupsSettingsComponent } from './pages/settings-page/containers/groups-settings/groups-settings.component';
import { SizingSettingsComponent } from './pages/settings-page/containers/sizing-settings/sizing-settings.component';
import { DownloadUploadSettingsComponent } from './pages/settings-page/containers/download-upload-settings/download-upload-settings.component';

const routes: Routes = [
  {path:'', component:HomePageComponent, children:[
    {path:'', redirectTo:"Home", pathMatch: "full"},
    {path:'Home', component:ContainerPageComponent},
    {path:'Settings', component:SettingsPageComponent, children:[
      {path:'', redirectTo:'Groups',pathMatch:'full'},
      {path:'Groups', component: GroupsSettingsComponent },
      {path:'Sizing', component: SizingSettingsComponent },
      {path:'UpDown', component: DownloadUploadSettingsComponent }
    ]},
    {path:'Console', component:ConsolePageComponent}
  ]},
  {path:'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
