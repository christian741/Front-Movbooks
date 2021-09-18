import { AlertController, LoadingController } from '@ionic/angular';
import { Parameter } from './../../../models/parameter.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ParametersService } from '../../../services/parameters.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPage implements OnInit {

  parameters: Parameter[] = [];

  constructor(
    private parametersService: ParametersService,
    private toastService: ToastService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.parametersService.dataChanges
        .subscribe(message => {
          this.loadParameters();
          this.toastService.presentToast({ message, duration: 1000 });
        });
    this.loadParameters();
  }

  loadParameters(): void {
    this.parametersService.getParameters()
        .subscribe(params => {
          this.parameters = params;
        });
  }

  insert(): void {
    this.presentAlertPrompt();
  }

  edit(param: Parameter): void {
    this.presentAlertPrompt(param);
  }

  async delete(param: Parameter) {
    const alert = await this.alertCtrl.create({
      message: `
        <strong>¿Estás seguro?</strong>
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
          text: 'Eliminar',
          cssClass: 'btn-confirm-delete',
          handler: () => {
            this.parametersService.deleteParameter(param.id)
                .subscribe(res => {
                  this.parametersService.dataChanges.next('El parámetro ha sido eliminado!');
                });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt(param?: Parameter) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: `${ param ? 'Editar' : 'Nuevo' } parámetro`,
      inputs: [
        {
          name: 'key',
          type: 'text',
          placeholder: 'Key',
          value: param?.key || ''
        },
        {
          name: 'value',
          type: 'text',
          placeholder: 'Value',
          value: param?.value || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: `${ param ? 'Actualizar' : 'Guardar' }`,
          cssClass: 'btn-save',
          handler: async (data) => {
            const { key, value } = data;
            if (!key || !value) {
              this.toastService.presentToast({
                message: 'No se ha completado el formulario',
                duration: 1000
              });
            } else {
              const loading = await this.loadingCtrl.create({ message: 'Espere por favor...' });
              await loading.present();
              this.parametersService.findByKey(key, param?.id)
                    .subscribe(exist => {
                      loading.dismiss();
                      if (!exist) {
                        this.createOrUpdateParameter(key, value, param);
                      } else {
                        this.toastService.presentToast({
                          message: 'La llave del parámetro ya existe',
                          duration: 1000
                        });
                      }
                    });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  createOrUpdateParameter(key: string, value: string, param?: Parameter): void{
    if (param) {
      param.key = key;
      param.value = value;
      this.parametersService.udpateParameter(param.id, param)
          .subscribe(_ => {
            this.parametersService.dataChanges.next('El parámetro ha sido editado!');
          });
    } else {
      this.parametersService.insertParamater({ key, value })
          .subscribe(_ => {
            this.parametersService.dataChanges.next('El parámetro ha sido agregado!');
          });
    }
  }

}
