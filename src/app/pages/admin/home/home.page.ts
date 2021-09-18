import { Component, OnInit } from '@angular/core';
import { menuItems } from '../menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  items = menuItems.slice(1);

  slidesOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor() {
  }

  ngOnInit() {
  }

}
