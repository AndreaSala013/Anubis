import {  OnInit, Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchInputChangeService } from 'src/app/services/search-input-change.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() logout = new EventEmitter();
  @Input("username") username : string;

  searchChangeSub : Subscription;
  searchInput = new FormControl();

  constructor(private searchServ:SearchInputChangeService) { }

  ngOnInit() {
    this.searchInput = new FormControl();
    this.searchChangeSub=this.searchInput.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(value=>{
      console.log(value);
      this.searchServ.emitSearchInputChangesEvent(value);
    });
  }

  logoutClick(){
    this.logout.emit();
  }

  ngOnDestroy(){
    console.log('NavbarComponent:destroy');
    this.searchChangeSub.unsubscribe();
  }

}
