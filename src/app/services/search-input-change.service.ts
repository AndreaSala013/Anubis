import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchInputChangeService {

  searchInputChanged : Subject<string> = new Subject<string>()

  constructor() { }

  emitSearchInputChangesEvent(input) {
    console.log("SearchInputChangeService: emitSearchInputChangesEvent")
    this.searchInputChanged.next(input);
 }
}
