import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { ImageService } from '../../../../services/images.service';
import { UsersService } from '../../../../services/users.service';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.page.html',
  styleUrls: ['./image-edit.page.scss'],
})
export class ImageEditPage implements OnInit {

  viewEntered = false;

  @Input() user: User;
  image: File;

  constructor(
    private imagesService: ImageService,
    private usersService: UsersService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    // console.log(this.user);
  }

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  async editAvatar() {
    const loading = await this.loadingCtrl.create({ message: 'Espere por favor...' });
    await loading.present();
    await this.deleteImage(this.user.image);
    this.user.image = undefined;
    this.user.avatar = this.user.avatar || 'av1.png';
    this.usersService.update(this.user)
        .subscribe(() => {
          this.loadingCtrl.dismiss();
          this.modalCtrl.dismiss({ update: true });
        });
  }

  async editImage() {
    const loading = await this.loadingCtrl.create({ message: 'Espere por favor...' });
    await loading.present();
    await this.deleteImage(this.user.image);
    this.imagesService.upload(this.image, 'Profiles')
          .subscribe(({uniqueFileName}) => {
            this.user.image = uniqueFileName;
            this.user.avatar = undefined;
            this.usersService.update(this.user)
                  .subscribe(() => {
                    this.loadingCtrl.dismiss();
                    this.modalCtrl.dismiss({ update: true });
                  });
          });
  }

  deleteImage(image?: string): Promise<any> {
    if (!image) {
      return Promise.resolve();
    }
    return this.imagesService.delete(image, 'Profiles').toPromise();
  }

}
