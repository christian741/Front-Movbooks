import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

// Validators
import { UniqueEmailValidator } from '../../validators/unique-email.validator';
import { UniqueNicknameValidator } from '../../validators/unique-nickname.validatos';

// Services
import { AuthService } from '../../services/auth.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  avatar = 'av1.png';

  showPassword = false;
  passwordToggleIcon = 'eye';
  showPasswordConfirm = false;
  passwordConfirmToggleIcon = 'eye';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uniqueEmailValidator: UniqueEmailValidator,
    private uniqueNicknameValidator: UniqueNicknameValidator,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nickname: [
        '',
        [Validators.required, Validators.minLength(6)],
        this.uniqueNicknameValidator.validate.bind(this.uniqueNicknameValidator)
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.equalsPasswords('password', 'confirmPassword')
    });
  }

  async register() {
    // Iniciar loading
    const loading = await this.loadingCtrl.create({ message: 'Espere por favor...' });
    await loading.present();

    // Formar el objeto usuario
    const { confirmPassword, ...props } = this.registerForm.value;
    const user: User = {
      ...props,
      roleId: 1,
      avatar: this.avatar
    };

    // Registrar usuario
    this.authService.register(user)
          .subscribe(
            _ => this.router.navigateByUrl('/'),
            err => {
              console.error(err);
              loading.dismiss();
              this.toastService.presentToast({
                message: 'Ha ocurrido un error',
                duration: 2000
              });
            },
            () => loading.dismiss()
          );
  }

  // Validator password Match
  equalsPasswords(pass1: string, pass2: string): any {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notEquals: true });
      }
    };
  }

  // Getters

  get nickname() {
    return this.registerForm.get('nickname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  ionViewDidLeave(): void {
    this.registerForm.reset();
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }

  toggleConfirmPassword(){
    this.showPasswordConfirm = !this.showPasswordConfirm;
    if(this.showPasswordConfirm){
      this.passwordConfirmToggleIcon = 'eye-off';
    }else{
      this.passwordConfirmToggleIcon = 'eye';
    }
  }
}
