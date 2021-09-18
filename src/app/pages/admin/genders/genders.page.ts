import { Component, OnInit } from '@angular/core';
import { Gender } from './../../../models/gender.model';
import { ToastService } from './../../../services/toast.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { GenderService} from '../../../services/gender.service';
import { CreateGenderPage } from './create-gender/create-gender.page';
import { GenderFilter } from '../../../query-filters/gender.filter';
@Component({
  selector: 'app-genders',
  templateUrl: './genders.page.html',
  styleUrls: ['./genders.page.scss'],
})
export class GendersPage implements OnInit {


  genders: any[] = [];
  constructor(private genderService: GenderService,
    private toastService: ToastService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.genderService.dataChanges
          .subscribe(message => {
            this.toastService.presentToast({ message, duration: 2000 });
            this.loadGenders();
          });
    this.loadGenders();
  }

  async loadGenders() {
    const filters: GenderFilter = {
      pageSize: 1000,
      pageNumber: 1,
      Name: '',
    };

    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.genders = [];
    this.genderService.getGenders(filters)
          .subscribe(({ data }) => {
            if (data.length === 0) {
             
              loading.dismiss();
              return;
            }
            console.log(this.genders+"   "+data);
            // Recorrer genders de la BD
            data.forEach((gender: Gender) => {
              // Obtener los detalles del libro
              this.genders.push(gender);
             // Ocultar Loading
             loading.dismiss();
            });
          });
  }

  async presentModalCreateOrUpdate(bookId?: number) {
    const modal = await this.modalCtrl.create({
      component: CreateGenderPage,
      componentProps: bookId ? { bookId } : {}
    });
    return await modal.present();
  }
}
