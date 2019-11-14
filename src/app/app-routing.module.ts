import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestComponent } from './test/test/test.component';
import { ConsolePageComponent } from './pages/console-page/console-page.component';

const routes: Routes = [
  {path:'', redirectTo:"Home", pathMatch: "full"},
  {path:'Home', component:HomePageComponent},
  {path:'Home/Console', component:ConsolePageComponent},
  {path:'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
