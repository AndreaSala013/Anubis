import { Component, OnInit, Inject } from '@angular/core';
import { PortainerService } from 'src/app/services/portainer.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { AppUtils } from 'src/app/utils/AppUtils';
import { Container } from 'src/app/model/Container';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  retry :boolean;
  isLoading :boolean;
  containerList : Container[] = [];

  constructor(
    private router:Router,
    private appUtils:AppUtils,
    private keyServ: KeycloakService,
    private portainerServ: PortainerService) { }

  async ngOnInit() {  
    this.retry = true;
    if(this.appUtils.getFromLocalStorage(AppUtils.PORTAINER_TOKENS)==null){
      await this.getPortainerTokenAndListContainers();
    }else{
      this.isLoading = true;
      await this.getContainerList();  
      this.isLoading = false;
    }
  }

  async getPortainerTokenAndListContainers():Promise<boolean>{
    console.log("HOMEPAGE: getPortainerTokenAndListContainers");
    this.appUtils.saveInLocalStorage(AppUtils.PORTAINER_TOKENS,null);
    this.isLoading = true;
    let portainerTokenOk = await this.getPortainerToken();
    if(!portainerTokenOk){
      alert("Errore durante il recupero del token di portainer");
      this.isLoading = false;
      return false;
    }
    else{
      let containersListOk = await this.getContainerList();
      if(!containersListOk){
        alert("Errore durante il recupero della lista containers");
        this.isLoading = false;
        return false;
      }
    }   
    this.isLoading = false;
    return true;
  }

  async getPortainerToken(): Promise<boolean>{
    console.log("HOMEPAGE: getPortainerToken");
    let proxyResp = await this.portainerServ.getPortainerToken();
    if(proxyResp == null || proxyResp.status != 200){
      return false; 
    }else{
      this.appUtils.saveInLocalStorage(AppUtils.PORTAINER_TOKENS,JSON.parse(proxyResp.message)['jwt']);
      console.log(this.appUtils.getFromLocalStorage(AppUtils.PORTAINER_TOKENS));
      return true;
    }
  }

  async getContainerList():Promise<boolean>{
    console.log("HOMEPAGE: getContainerList");
    console.log(this.appUtils.getFromLocalStorage(AppUtils.PORTAINER_TOKENS));
    let proxyResp = await this.portainerServ.getContainerList(this.appUtils.getFromLocalStorage(AppUtils.PORTAINER_TOKENS));
    if(proxyResp == null){
      return false;
    }
    else if(proxyResp.status != 200){
      if(proxyResp.message == AppUtils.PORTAINER_INVALID_TOKEN && this.retry){
        this.retry = false;
        return await this.getPortainerTokenAndListContainers();
      }
      return false;
    }
    else{
      let containersArray = JSON.parse(proxyResp.message);
      containersArray.forEach(element => {
        let container = new Container;
        container.id = element['Id'];
        container.status = element['State'];
        container.name = element['Names'][0];
        container.name = container.name.substr(1);
        this.containerList.push(container);
      });
      return true;
    }
  }

  onLogout(){
    console.log("HOMEPAGE: onLogout");
    this.appUtils.saveInLocalStorage(AppUtils.PORTAINER_TOKENS,null);
    this.keyServ.logout();
    this.router.navigate(['/']);
  }

}
