import { Injectable } from '@angular/core';
import {  tap } from "rxjs/operators";
import { ProxyResponse } from '../model/ProxyResponse';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortainerService {

  constructor(private http: HttpClient) { }

  getPortainerToken():Promise<ProxyResponse> {
    console.log("PORTAINERSERVICE: getPortainerToken");
    let url = environment.urlDockerProxy + environment.methodLoginPortainer;
    return this.http
    .get(url)
    .pipe(
      tap(value=>console.log(value))
    )
    .toPromise()
    .catch(err=>{
      console.log(err);
      return null;
    });
  }

  getContainerList(jwtToken):Promise<ProxyResponse> {
    console.log("PORTAINERSERVICE: getContainerList");
    console.log(jwtToken);
    let url = environment.urlDockerProxy + environment.methodListContainers;
    let params = new HttpParams()
    .set("jwtToken", jwtToken)
    .set("filter","");  
    let headers = new HttpHeaders()
    .set("Content-Type","application/x-www-form-urlencoded");

    return this.http
    .post(url,params, {headers})
    .pipe(
      tap(value=>console.log(value))
    )
    .toPromise()
    .catch(err=>{
      console.log(err);
      return null;
    });
  }

  startContainer(jwtToken,idContainer):Promise<ProxyResponse>{
    console.log("PORTAINERSERVICE: startContainer");
    let url = environment.urlDockerProxy + environment.methodStartContainers;
    let params = new HttpParams()
    .set("jwtToken", jwtToken)
    .set("idContainer",idContainer);  
    let headers = new HttpHeaders()
    .set("Content-Type","application/x-www-form-urlencoded");
    return this.http
    .post(url,params, {headers})
    .pipe(
      tap(value=>console.log(value))
    )
    .toPromise()
    .catch(err=>{
      console.log(err);
      return null;
    });
  }

  stopContainer(jwtToken,idContainer):Promise<ProxyResponse>{
    console.log("PORTAINERSERVICE: stopContainer");
    let url = environment.urlDockerProxy + environment.methodStopContainers;
    let params = new HttpParams()
    .set("jwtToken", jwtToken)
    .set("idContainer",idContainer);  
    let headers = new HttpHeaders()
    .set("Content-Type","application/x-www-form-urlencoded");
    return this.http
    .post(url,params, {headers})
    .pipe(
      tap(value=>console.log(value))
    )
    .toPromise()
    .catch(err=>{
      console.log(err);
      return null;
    });
  }
}
