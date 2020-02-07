import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContainerGroup } from 'src/app/model/ContainerGroup';
import { Container } from 'src/app/model/Container';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent implements OnInit {

  @Input('selectedGroup') selectedGroup:ContainerGroup;
  @Input('allGroups') allGroups : ContainerGroup[];

  public allContainers : Container[];
  @Input('allContainers') 
  set setAllContainers(value: Container[]){
    if(value != null && value.length > 0){
      this.allContainers = value;
      this.allContainers.sort((a,b)=>{
        if(a.name>b.name){
          return 1;
        }else{
          return -1;
        }
      });
    }
  }
  @Input('selectedContainers') selectedContainers : String[];
  @Input('blockedContainers') blockedContainers : String[];

  @Output('gruppiSalvati') gruppiSalvati = new EventEmitter<ContainerGroup[]>();
  @Output('gruppiSalvatiDopoRemove') gruppiSalvatiDopoRemove = new EventEmitter<ContainerGroup[]>();

  
  constructor() { }

  ngOnInit() {
  }

  onChangeCheck(element, container : Container){
    if(element.checked){
      this.selectedContainers.push(container.name);
      const index: number = this.blockedContainers.indexOf(container.name);
      if (index !== -1) {
          this.blockedContainers.splice(index, 1);
      }     
    }else{
      //this.blockedContainers.push(container.name);
      const index: number = this.selectedContainers.indexOf(container.name);
      if (index !== -1) {
          this.selectedContainers.splice(index, 1);
      }     
    }
  }

  salvaGruppo(){
    this.selectedGroup.containersNames = [];
    this.selectedGroup.containersNames = this.selectedContainers;

    for(let gr of this.allGroups){
      if(gr.name == this.selectedGroup.name ){
        gr.containersNames = this.selectedGroup.containersNames;
      }
    }

    this.gruppiSalvati.emit(this.allGroups);
  }

  eliminaGruppo(){
    let index : number;
    for(let gr of this.allGroups){
      if(gr.name == this.selectedGroup.name ){
        index = this.allGroups.indexOf(gr);
      }
    }
    this.allGroups.splice(index, 1);
    this.gruppiSalvatiDopoRemove.emit(this.allGroups);
  }

}
