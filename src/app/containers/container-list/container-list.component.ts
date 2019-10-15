import { Component, OnInit, Input } from '@angular/core';
import { Container } from 'src/app/model/Container';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  @Input('containerList') containerList : Container[];

  constructor() { }

  ngOnInit() {

  }

}
