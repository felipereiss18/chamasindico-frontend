import {Component, OnInit} from '@angular/core';
import {onMainContentChange} from "../../../animations/animations";
import {SidenavService} from "../../../../services/menu/sidenav.service";
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [onMainContentChange]
})
export class HomeComponent implements OnInit {

  onSideNavChange: boolean = false;
  carregandoPagina = false;

  constructor(private _sidenavService: SidenavService, private router: Router) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })

    this.router.events
      .pipe(
        filter(
          (event: Event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((event: Event) => {
        this.carregandoPagina = event instanceof NavigationStart;
      });
  }

  ngOnInit(): void {
  }
}
