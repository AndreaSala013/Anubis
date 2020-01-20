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

  stringInput : string;

  constructor() { }

  ngOnInit() {
  }

  addNew(){
    if(this.stringInput == null || this.stringInput == ""){
      alert("Input non corretto");
    }
    else if(this.stringsList != null && this.stringsList != undefined && this.stringsList.includes(this.stringInput)){
      alert("Valore già presente");
    }else{
      if(this.stringsList == null || this.stringsList == undefined){
        this.stringsList = [];
      }
      this.stringsList.push(this.stringInput);
      this.selectedIndex = this.stringsList.length-1;
      this.newElement.emit(this.stringInput);
      this.stringInput = "";
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
