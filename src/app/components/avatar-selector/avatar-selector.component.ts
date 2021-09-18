import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Avatar } from '../../interfaces/avatar.inteface';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @ViewChild('slides,', { static: false }) slides: IonSlides;

  @Input() current = 'av1.png'; // default value
  @Output() avatarSelected = new EventEmitter<string>(); // emit avatar.img

  avatarSlidesOpts = {
    slidesPerView: 3.5
  };

  avatars: Avatar[] = [
    { img: 'av1.png', selected: false },
    { img: 'av2.png', selected: false },
    { img: 'av3.png', selected: false },
    { img: 'av4.png', selected: false },
    { img: 'av5.png', selected: false },
    { img: 'av6.png', selected: false },
    { img: 'av7.png', selected: false },
    { img: 'av8.png', selected: false },
    { img: 'av9.png', selected: false },
    { img: 'av10.png', selected: false }
  ];

  constructor() { }

  ngOnInit() {
    this.avatars.forEach(av => av.selected = (av.img === this.current) );
  }

  selectAvatar(avatar: Avatar, index: number) {
    this.slides.slideTo(index, 400);
    this.avatars.forEach(av => av.selected = false);
    // JS trabaja con parámetros por referencia
    avatar.selected = true;
    // emit
    this.avatarSelected.emit(avatar.img);
  }

}
