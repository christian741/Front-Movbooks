import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

// Services
import { AuthService } from '../../services/auth.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create({message: 'Espere por favor...'});
    await loading.present();
    this.authService.login(this.loginForm.value)
        .subscribe(
          res => {
            const { userDetails } = res;
            if (userDetails.enabled === false) {
              this.toastService.presentToast({
                mode: 'ios',
                color: 'dark',
                message: 'El usuario ha sido deshabilitado',
                duration: 2000
              });
            } else {
              this.router.navigateByUrl('/');
            }
          },
          err => {
            console.error(err);
            loading.dismiss();
            this.toastService.presentToast({
              mode: 'ios',
              color: 'dark',
              message: err.error.message,
              duration: 2000
            });
          },
          () => loading.dismiss()
        );
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  ionViewDidLeave(): void {
    this.loginForm.reset();
  }

  tooglePassword(){
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }
}
