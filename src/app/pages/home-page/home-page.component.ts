import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { PortainerService } from 'src/app/services/portainer.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { AppUtils } from 'src/app/utils/AppUtils';
import { Container } from 'src/app/model/Container';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isLoading :boolean;
  containerList : Container[] = [];

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private keyServ: KeycloakService,
    private portainerServ: PortainerService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.delay(5000);
    if(this.storage.get(AppUtils.PORTAINER_TOKENS)==null){
      await this.getPortainerToken();
    }
    await this.getContainerList();
    this.isLoading = false;
  }

  async getPortainerToken(){
    console.log("HOMEPAGE: getPortainerToken");
    let proxyResp = await this.portainerServ.getPortainerToken();
    if(proxyResp == null || proxyResp.status != 200){
      this.isLoading = false;
      alert("Errore durante il recupero del token di portainer");
    }else{
      this.saveInLocalStorage(JSON.parse(proxyResp.message)['jwt']);
    }
  }

  async getContainerList(){
    console.log("HOMEPAGE: getContainerList");
    let proxyResp = await this.portainerServ.getContainerList(this.storage.get(AppUtils.PORTAINER_TOKENS));
    if(proxyResp == null || proxyResp.status != 200){
      alert("Errore durante il recupero della lista containers");
    }else{
      let containersArray = JSON.parse(proxyResp.message);
      containersArray.forEach(element => {
        let container = new Container;
        container.id = element['Id'];
        container.status = element['State'];
        container.name = element['Names'][0];
        this.containerList.push(container);
        console.log(element);
      });
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  saveInLocalStorage(portainerToken){
    console.log(portainerToken);
    this.storage.set(AppUtils.PORTAINER_TOKENS, portainerToken);
  }

}
