import { Component, OnInit } from '@angular/core';
import { Pqr } from '../../../models/pqr.model';
import { User } from './../../../models/user.model';
import { PqrsService } from '../../../services/pqrs.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, AlertController } from '@ionic/angular';
import { cardAnimation } from './../../../animations/animations';
import { DetailsPqrPage } from './details-pqr/details-pqr.page';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.page.html',
  styleUrls: ['./pqrs.page.scss'],
  animations: [ cardAnimation ]
})
export class PqrsPage implements OnInit {

  answered = false;
  currentUser: User;
  pqrs: Pqr[] = [];

  constructor(
    private authService: AuthService,
    private pqrsService: PqrsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    // Obtener el usuario actual
    this.currentUser = await this.authService.getCurrentUserAsync();
    // Data changes del Pqrs service
    this.pqrsService.dataChanges
        .subscribe(message => {
          this.toastService.presentToast({ message, duration: 2000 });
          this.loadPqrs();
        });
    // Cargar pqrs
    this.loadPqrs();
  }

  // Obtener el listado de pqrs del usuario actual
  loadPqrs(): void {
    this.pqrsService.getPqrsByUser(this.currentUser.id)
        .subscribe(res => this.pqrs = res);
  }

  async details(pqrId: number) {
    const modal = await this.modalCtrl.create({
      component: DetailsPqrPage,
      componentProps: { pqrId }
    });
    return await modal.present();
  }

  async presentAlertConfirm(pqrId: number) {
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: 'No podrás revertir los cambios',
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
          text: 'Eliminar',
          cssClass: 'btn-confirm-delete',
          handler: () => {
            this.deletePqr(pqrId);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo PQR',
      inputs: [
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripción'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn-cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          cssClass: 'btn-save',
          handler: (data) => {
            const { description } = data;
            if (description){
              this.addPqr(description);
            } else {
              this.toastService.presentToast({
                message: 'La descripción es requerida',
                duration: 1000
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  deletePqr(pqrId: number): void {
    this.pqrsService.deletePqr(pqrId)
          .subscribe(_ => {
            this.pqrsService.dataChanges.next('El pqr ha sido eliminado!');
          });
  }

  addPqr(description: string): void {
    const pqr: Pqr = {
      description,
      userId: this.currentUser.id
    };
    this.pqrsService.insertPqr(pqr)
          .subscribe(_ => {
            this.pqrsService.dataChanges.next('El pqr ha sido agregado exitosamente!');
          });
  }

}
