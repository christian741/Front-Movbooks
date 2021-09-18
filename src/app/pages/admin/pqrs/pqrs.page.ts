import { Component, OnInit } from '@angular/core';
import { ToastService } from './../../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { Pqr } from './../../../models/pqr.model';

import { PqrsService } from '../../../services/pqrs.service';
import { DetailsPqrPage } from './details-pqr/details-pqr.page';
import { cardAnimation } from '../../../animations/animations';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.page.html',
  styleUrls: ['./pqrs.page.scss'],
  animations: [
    cardAnimation
  ]
})
export class PqrsPage implements OnInit {

  answered = false;
  pqrs: Pqr[] = [];

  constructor(
    private pqrsService: PqrsService,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.pqrsService.dataChanges
        .subscribe(message => {
          this.toastService.presentToast({ message, duration: 2000 });
          this.loadPqrs();
        });
    this.loadPqrs();
  }

  loadPqrs(): void {
    this.pqrsService.getPqrs()
          .subscribe(pqrs => {
            this.pqrs = pqrs;
          });
  }

  async details(pqrId: number) {
    const modal = await this.modalCtrl.create({
      component: DetailsPqrPage,
      componentProps: { pqrId }
    });
    return await modal.present();
  }

}
