import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContainerGroup } from 'src/app/model/ContainerGroup';
import { Container } from 'src/app/model/Container';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent implements OnInit {

  private _selectedGroup;

  @Input('containerList') containerList: Container[];
  @Input('selectedGroup') selectedGroup:ContainerGroup;
  @Input('allGroups') allGroups : ContainerGroup[];
  @Output('gruppiSalvati') gruppiSalvati = new EventEmitter<ContainerGroup[]>();

  selectedContainers : String[];
  blockedContainers : String[];

  constructor() { }

  ngOnInit() {
    this.reloadList();
  }

  reloadList(){
    this.selectedContainers = [];
    this.selectedContainers = this.selectedGroup.containersNames;

    this.blockedContainers = [];
    this.allGroups.forEach(gr=>{
      if(gr.name != this.selectedGroup.name){
        gr.containersNames.forEach(cont=>{
          this.blockedContainers.push(cont);
        });
      }
    });
  }

  onChangeCheck(element, container : Container){
    if(element.checked){
      this.selectedContainers.push(container.name);
      const index: number = this.blockedContainers.indexOf(container.name);
      if (index !== -1) {
          this.blockedContainers.splice(index, 1);
      }     
    }else{
      this.blockedContainers.push(container.name);
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
    
  }

}
