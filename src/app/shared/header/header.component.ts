import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() backButton = false;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      message: `
        <strong>¿Quieres cerrar la sesión?</strong>
      `,
      cssClass: 'alert-buttons',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Cerrar sesión',
          cssClass: 'btn-confirm',
          handler: () => {
            this.authService.logOut();
          }
        }
      ]
    });

    await alert.present();
  }
}
