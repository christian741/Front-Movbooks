import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { UsersService } from '../../../services/users.service';
import { User } from './../../../models/user.model';
import { DetailsUserPage } from './details-user/details-user.page';
import { cardAnimation } from '../../../animations/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  animations: [
    cardAnimation
    // ..other triggers
  ]
})
export class UsersPage implements OnInit {

  filtro = '';
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers()
        .subscribe(users => {
          this.users = users;
        });
  }

  async details(userId: number) {
    const modal = await this.modalCtrl.create({
      component: DetailsUserPage,
      componentProps: { userId }
    });
    return await modal.present();
  }

}
