import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {BasicComponent} from "../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../core/auth/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BasicComponent implements OnInit {

  loginForm: FormGroup = new FormGroup(
    {
      usuario: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    }
  );


  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService
  ) {
    super(spinnerService, snotifyService, userService);
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid){
      this.showLoading()
      this.authService.authenticate(this.loginForm.get('usuario')?.value, this.loginForm.get('senha')?.value)
        .subscribe((res) => {
          this.router.navigate(['']);
          this.closeLoading();
        }, error => {
          const err = JSON.parse(error.error);
          this.messageError(err.message);
        })
    }
  }
}
