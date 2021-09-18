import { Pqr } from './../../../../models/pqr.model';
import { Component, Input, OnInit } from '@angular/core';
import { PqrsService } from '../../../../services/pqrs.service';
import { ModalController } from '@ionic/angular';

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

  @Input() pqrId: number;
  pqr: Pqr;

  constructor(
    private pqrsService: PqrsService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.pqrsService.getPqr(this.pqrId)
          .subscribe(res => this.pqr = res);
  }

}
