import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isloading = false;
  isLogin = true;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  onLogin() {
    this.isloading = true;
    this.loadingCtrl.create({ keyboardClose: true, message: "Logging in...." }).then(
      loddingEl => {
        loddingEl.present();
        setTimeout(() => {
          loddingEl.dismiss();
          this.isloading = false;
          this.authService.login();
          this.router.navigateByUrl('/places/tabs/discover');

        }
          , 1500);
      });

  }
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);



    if (this.isLogin) {
      //send a request to login Service
    } else {
      //send a request to Signup Service
    }
  }
}
