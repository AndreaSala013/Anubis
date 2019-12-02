import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clickable-list',
  templateUrl: './clickable-list.component.html',
  styleUrls: ['./clickable-list.component.scss']
})
export class ClickableListComponent implements OnInit {

  @Input('placeholderNew') placeholderNew : String;
  @Input('stringsList') stringsList : String[];

  @Output() newElement = new EventEmitter<String>();
  @Output() clickedElement = new EventEmitter<String>();
  @Output() svuotaListaGruppi = new EventEmitter();

  inputValue : string = null;
  selectedIndex : number;

  constructor() { }

  ngOnInit() {
  }

  addNew(strVal:string){
    if(strVal == null || strVal == ""){
      alert("Input non corretto");
    }
    else if(this.stringsList != null && this.stringsList != undefined && this.stringsList.includes(strVal)){
      alert("Valore già presente");
    }else{
      if(this.stringsList == null || this.stringsList == undefined){
        this.stringsList = [];
      }
      this.stringsList.push(strVal);
      this.selectedIndex = this.stringsList.length-1;
      this.newElement.emit(strVal);
    }
  }

  onItemClick(strVal:string, index:number){
    this.selectedIndex = index;
    this.clickedElement.emit(strVal);
  }

  svuotaLista(){
    this.svuotaListaGruppi.emit();
  }

}
