import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestComponent } from './test/test/test.component';
import { ConsolePageComponent } from './pages/console-page/console-page.component';
import { ContainerPageComponent } from './pages/container-page/container-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  {path:'', component:HomePageComponent, children:[
    {path:'', redirectTo:"Home", pathMatch: "full"},
    {path:'Home', component:ContainerPageComponent},
    {path:'Settings', component:SettingsPageComponent},
    {path:'Console', component:ConsolePageComponent}
  ]},
  {path:'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
