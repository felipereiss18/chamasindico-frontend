import {Component, Input, OnInit} from '@angular/core';
import {TokenService} from "../../../../core/auth/token/token.service";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  @Input() menu: MatSidenav;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOff() {
    this.tokenService.removeToken();
    this.router.navigate(['/login'])
  }
}
