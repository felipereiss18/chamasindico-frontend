import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {BasicComponent} from "../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";

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
  ) {
    super(spinnerService, snotifyService);
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
        })
    }
  }
}
