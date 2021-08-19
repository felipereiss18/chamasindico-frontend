import {Component, OnInit} from '@angular/core';
import {animateText, onSideNavChange} from "../../../animations/animations";
import {SidenavService} from "../../../../services/menu/sidenav.service";
import {UserService} from "../../../../core/auth/user/user.service";
import {Perfil} from "../../../../core/auth/user/perfil";
import {Roles} from "../../../../core/auth/user/roles.enum";
import {User} from "../../../../core/auth/user/user";

interface Menu {
  link: string;
  name: string;
  icon?: string;
  img?: string,
  subMenus?: Menu[];
  openSubMenus?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class MenuComponent implements OnInit {

  sideNavState: boolean = false;
  linkText: boolean = false;
  menus: Menu[] = [];
  usuario: User = {} as User;

  constructor(
    private sidenavService: SidenavService,
    private userService: UserService
  ) {
    this.userService.getUser().subscribe(res =>{
      this.usuario = res;
      this.menus = this.criarMenu(res.perfil);
    })
  }

  ngOnInit(): void {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState)
  }

  abrirSubMenus(menu: Menu) {
    menu.openSubMenus = !menu.openSubMenus;
  }

  private criarMenu(perfil: Perfil | null): Menu[] {
    if (perfil?.role === Roles.ADMIN){
      return [
        {name: 'Home', link:'some-link', icon: 'home'},
        {name: 'Configurações', link:'some-link', icon: 'settings_applications',
          subMenus: [
            {name: 'Condomínios', link:'some-link', icon: 'apartment'},
            {name: 'Blocos', link: 'some-link', img: 'assets/img/edificios.png'},
            {name: 'Unidades', link: 'some-link', icon: 'maps_home_work'},
            {name: 'Áreas Comuns', link: 'some-link', icon: 'deck'},
            {name: 'Usuários', link:'some-link', icon: 'person'},
          ]},
      ];
    }else if (perfil?.role === Roles.SINDICO) {
      return [
        {name: 'Home', link:'some-link', icon: 'home'},
        {name: 'Minha Unidade', link:'some-link', icon: 'maps_home_work'},
        {name: 'Usuários', link:'some-link', icon: 'person'},
        {name: 'Condomínio', link:'some-link', icon: 'apartment',
          subMenus: [
            {name: 'Blocos', link: 'some-link', img: 'assets/img/edificios.png'},
            {name: 'Unidades', link: 'some-link', icon: 'maps_home_work'},
            {name: 'Áreas Comuns', link: 'some-link', icon: 'deck'},
          ]
        },
        {name: 'Comunicados', link:'some-link', icon: 'campaign'},
        {name: 'Reserva de Espaço', link: 'some-link', icon: 'event_available'},
        {name: 'Ocorrências', link: 'some-link', icon: 'menu_book'},
        {name: 'Correspondência', link: 'some-link', icon: 'forward_to_inbox'},
        {name: 'Assembleia', link: 'some-link', icon: 'forum'},
      ];
    }else if (perfil?.role === Roles.PROPRIE) {
      return [
        {name: 'Home', link:'some-link', icon: 'home'},
        {name: 'Minha Unidade', link:'some-link', icon: 'maps_home_work'},
        {name: 'Comunicados', link:'some-link', icon: 'campaign'},
        {name: 'Reserva de Espaço', link: 'some-link', icon: 'event_available'},
        {name: 'Ocorrências', link: 'some-link', icon: 'menu_book'},
        {name: 'Correspondência', link: 'some-link', icon: 'forward_to_inbox'},
        {name: 'Assembleia', link: 'some-link', icon: 'forum'},
      ];
    }else if (perfil?.role === Roles.INQUILINO) {
      return [
        {name: 'Home', link:'some-link', icon: 'home'},
        {name: 'Minha Unidade', link:'some-link', icon: 'maps_home_work'},
        {name: 'Comunicados', link:'some-link', icon: 'campaign'},
        {name: 'Reserva de Espaço', link: 'some-link', icon: 'event_available'},
        {name: 'Ocorrências', link: 'some-link', icon: 'menu_book'},
        {name: 'Correspondência', link: 'some-link', icon: 'forward_to_inbox'},
        {name: 'Assembleia', link: 'some-link', icon: 'forum'},
      ];
    }else if (perfil?.role === Roles.PORTEIRO) {
      return [
        {name: 'Home', link:'some-link', icon: 'home'},
        {name: 'Comunicados', link:'some-link', icon: 'campaign'},
        {name: 'Ocorrências', link: 'some-link', icon: 'menu_book'},
        {name: 'Correspondência', link: 'some-link', icon: 'forward_to_inbox'},
      ];
    }else if (perfil?.role === Roles.ZELADOR) {
      return [
        {name: 'Home', link:'some-link', icon: 'home'},
        {name: 'Usuários', link:'some-link', icon: 'person'},
        {name: 'Condomínio', link:'some-link', icon: 'apartment', subMenus: [
            {name: 'Blocos', link: 'some-link', img: 'assets/img/edificios.png'},
            {name: 'Unidades', link: 'some-link', icon: 'maps_home_work'},
            {name: 'Áreas Comuns', link: 'some-link', icon: 'deck'},
          ]},
        {name: 'Comunicados', link:'some-link', icon: 'campaign'},
        {name: 'Ocorrências', link: 'some-link', icon: 'menu_book'},
        {name: 'Correspondência', link: 'some-link', icon: 'forward_to_inbox'},
        {name: 'Assembleia', link: 'some-link', icon: 'forum'},
      ];
    }
    return [];
  }
}
