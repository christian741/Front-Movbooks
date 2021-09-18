import { AlertController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
})
export class CardMovieComponent implements OnInit {

  @Input() editable: boolean;
  @Input() movieDetails: any;
  @Output() presentEdit = new EventEmitter<number>();

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // console.log(this.movieDetails);
  }

  details(movieId: number) {
    this.router.navigate([this.editable ? 'admin' : 'dashboard', 'movies', movieId]);
  }

  edit(movieId: number) {
    this.presentEdit.emit(movieId);
  }

  async presentAlertConfirm(movieId: number) {
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
            this.moviesService.deleteMovie(movieId)
                .subscribe(_ => {
                  this.moviesService.dataChanges.next('La película ha sido eliminada!');
                });
          }
        }
      ]
    });

    await alert.present();
  }

}
