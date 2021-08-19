import {Component, OnInit} from '@angular/core';
import {onMainContentChange} from "../../../animations/animations";
import {SidenavService} from "../../../../services/menu/sidenav.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [onMainContentChange]
})
export class HomeComponent implements OnInit {

  onSideNavChange: boolean = false;

  constructor(private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })
  }

  ngOnInit(): void {
  }
}
