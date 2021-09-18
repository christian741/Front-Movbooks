import { Component, OnInit } from '@angular/core';
import { menuItems } from './../../pages/dashboard/menu';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {

  items = menuItems;

  constructor() { }

  ngOnInit() {}
}
