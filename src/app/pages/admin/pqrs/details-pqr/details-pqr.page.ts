import { Pqr } from './../../../../models/pqr.model';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PqrsService } from '../../../../services/pqrs.service';

@Component({
  selector: 'app-details-pqr',
  templateUrl: './details-pqr.page.html',
  styleUrls: ['./details-pqr.page.scss'],
})
export class DetailsPqrPage implements OnInit {

  slidesOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  pqr: Pqr;
  @Input() pqrId: number;

  constructor(
    private pqrsService: PqrsService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.pqrsService.getPqr(this.pqrId)
          .subscribe(pqr => {
            this.pqr = pqr;
          });
  }

  respond(): void {
    this.pqrsService.updatePqr(this.pqrId, this.pqr)
          .subscribe(_ => {
            this.pqrsService.dataChanges.next('El PQR ha sido respondido!');
            this.modalCtrl.dismiss();
          });
  }

}
