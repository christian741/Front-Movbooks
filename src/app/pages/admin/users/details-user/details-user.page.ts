import { UsersService } from '../../../../services/users.service';
import { User } from 'src/app/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.page.html',
  styleUrls: ['./details-user.page.scss'],
})
export class DetailsUserPage implements OnInit {

  user: User;
  @Input() userId: number;

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    private usersService: UsersService,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.usersService.getUser(this.userId)
          .subscribe(user => this.user = user);
  }

  async updateUser() {
    const loading = await this.loadingCtrl.create({ message: 'Espere por favor...' });
    await loading.present();
    this.usersService.update(this.user)
        .subscribe(_ => {
          loading.dismiss();
        });
  }

}
