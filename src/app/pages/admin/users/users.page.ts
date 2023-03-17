import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { UsersService } from '../../../services/users.service';
import { User } from './../../../models/user.model';
import { DetailsUserPage } from './details-user/details-user.page';
import { cardAnimation } from '../../../animations/animations';
import { UserFilter } from 'src/app/query-filters/user.filter';

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

  filter = '';
  users: User[] = [];

   // Pagination
   pageSize = 9;
   pageNumber = 1;
   totalCount = 0;

  constructor(
    private usersService: UsersService,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    const filter: UserFilter = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      nickname: this.filter,
      email: this.filter,
    };
    this.usersService.getUsers(filter)
        .subscribe(users => {
          this.users = users;
        });
  }

  loadData(event: any) {
    setTimeout(() => {

      // Cambiar de página
      this.pageNumber += 1;
      // Volver a cargar los registros
      this.loadUsers();
      // Complete para el infinite-scroll
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if ((this.pageSize * this.pageNumber) >= this.totalCount) {
        event.target.disabled = true;
      }
    }, 500);
  }

  async details(userId: number) {
    const modal = await this.modalCtrl.create({
      component: DetailsUserPage,
      componentProps: { userId }
    });
    return await modal.present();
  }

  filterUser(): void {
    this.users = [];
    this.pageNumber = 1;
    this.loadUsers();
  }

}
