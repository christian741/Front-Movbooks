import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ImageEditPage } from './image-edit/image-edit.page';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.authService.validateToken()
        .subscribe(data => {
          this.user = data;
        });
  }

  async presentModalEditImage() {
    const modal = await this.modalCtrl.create({
      component: ImageEditPage,
      componentProps: { user: this.user }
    });
    await modal.present();
    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        this.authService.updateToken(this.user)
          .subscribe(({ userDetails }) => {
            this.user = userDetails;
            this.toastService.presentToast({ message: 'La imagen ha sido cambiada', duration: 2000 });
          });
      }
    });
  }

}
