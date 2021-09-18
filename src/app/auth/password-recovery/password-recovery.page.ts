import { User } from './../../models/user.model';
import { ToastService } from './../../services/toast.service';
import { UsersService } from '../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { PasswordRecoveryService } from '../../services/password-recovery.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

 
  @ViewChild('slides', { static: true }) slides: IonSlides;
  slidesOpts = {
    allowTouchMove: false,
    speed: 400
  };

  token: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    private usersService: UsersService,
    private passwordRecoveryService: PasswordRecoveryService,
    private toastService: ToastService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ token }) => {
      if (token) {
        this.token = token;
        this.verifyToken();
      }
    });
  }

  async validateEmail() {
    const loading = await this.loadingCtrl.create({ message: 'Espere por favor...' });
    await loading.present();
    this.usersService.findByEmail(this.email)
                .subscribe(user => {
                  loading.dismiss();
                  if (!user){
                    this.toastService.presentToast({
                      message: 'El correo no corresponde a ningún usuario del sistema',
                      duration: 2000
                    });
                  } else {
                    this.passwordRecoveryService.create({ email: this.email })
                          .subscribe(_ => {
                            this.toastService.presentToast({
                              message: 'Se ha enviado un código de verificación al correo',
                              duration: 2000
                            });
                          });
                  }
                });
  }

  verifyToken(): void {
    this.passwordRecoveryService.find(this.token)
          .subscribe(
            ({ email }) => {
              this.email = email;
              this.slides.slideNext();
            },
            err => {
              if (err.status === 404) {
                this.toastService.presentToast({ message: err.error.message, duration: 2000 });
              }
            }
          );
  }

  changePassword(): void {
    this.usersService.findByEmail(this.email)
          .subscribe((user: User) => {
            user.password = this.password;
            this.usersService.update(user)
                .subscribe(_ => {
                  this.toastService.presentToast({ message: 'La contraseña ha sido cambiada exitosamente!', duration: 2000 });
                  this.router.navigateByUrl('/login');
                });
          });
  }

}
