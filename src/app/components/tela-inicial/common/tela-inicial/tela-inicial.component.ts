import { Component, OnInit } from '@angular/core';
import {BasicComponent} from "../../../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../../core/auth/user/user.service";
import {Roles} from "../../../../core/auth/user/roles.enum";

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent extends BasicComponent  implements OnInit {

  roles = Roles;

  constructor(
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
  ) {
    super(snipperService, snotifyService, userService);
  }

  ngOnInit(): void {
  }

}
