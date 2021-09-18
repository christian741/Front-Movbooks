import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async presentToast(options: any){
    const toast = await this.toastCtrl.create(options);
    toast.present();
  }
}
