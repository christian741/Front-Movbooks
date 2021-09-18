import { Component, OnInit } from '@angular/core';
import { menuItems } from './../../pages/admin/menu';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
})
export class MenuAdminComponent implements OnInit {

  items = menuItems;

  constructor() { }

  ngOnInit() {}

}
