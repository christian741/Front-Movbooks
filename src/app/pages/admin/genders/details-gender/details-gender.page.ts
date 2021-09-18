import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderService } from '../../../../services/gender.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details-gender',
  templateUrl: './details-gender.page.html',
  styleUrls: ['./details-gender.page.scss'],
})
export class DetailsGenderPage implements OnInit {

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };
  bookDetails: any;
  readMore = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private genderService: GenderService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.route.params.subscribe(({ id }) => {
      this.genderService.getGender(id).subscribe(gender => {
        if (!gender) {
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl('/admin/genders');
          return;
        }
      });
    });
  }

}
