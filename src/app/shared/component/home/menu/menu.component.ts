import {Component, OnInit} from '@angular/core';
import {animateText, onSideNavChange} from "../../../animations/animations";
import {SidenavService} from "../../../../services/menu/sidenav.service";
import {UserService} from "../../../../core/auth/user/user.service";
import {Perfil} from "../../../../core/auth/user/perfil";
import {Roles} from "../../../../core/auth/user/roles.enum";
import {User} from "../../../../core/auth/user/user";

interface Menu {
  link?: string;
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
        {name: 'Mural', link:'', icon: 'newspaper'},
        {name: 'Configurações', icon: 'settings_applications',
          subMenus: [
            {name: 'Condomínios', link:'condominio', icon: 'apartment'},
            {name: 'Unidades', link: 'unidade', icon: 'maps_home_work'},
            {name: 'Usuários', link:'usuario', icon: 'person'},
          ]},
      ];
    }else if (perfil?.role === Roles.SINDICO) {
      return [
        {name: 'Mural', link:'', icon: 'newspaper'},
        {name: 'Minha Unidade', link:'some-link', icon: 'maps_home_work'},
        {name: 'Condomínio', icon: 'apartment',
          subMenus: [
            {name: 'Funcionário', link:'funcionario', icon: 'person'},
            {name: 'Unidades', link: 'unidade', icon: 'maps_home_work'},
            {name: 'Áreas Comuns', link: 'area-comum', icon: 'deck'},
            {name: 'Comunicados', link:'comunicado', icon: 'campaign'},
          ]
        },
        {name: 'Reserva de Espaço', link: 'some-link', icon: 'event_available'},
        {name: 'Ocorrências', link: 'ocorrencia', icon: 'menu_book'},
        {name: 'Correspondência', link: 'correspondencia', icon: 'forward_to_inbox'},
        {name: 'Visitante', link: 'visitante', icon: 'group'},
      ];
    }else if (perfil?.role === Roles.PROPRIE) {
      return [
        {name: 'Mural', link:'', icon: 'newspaper'},
        {name: 'Minha Unidade', link:'some-link', icon: 'maps_home_work'},
        {name: 'Reserva de Espaço', link: 'some-link', icon: 'event_available'},
        {name: 'Ocorrências', link: 'ocorrencia', icon: 'menu_book'},
        {name: 'Correspondência', link: 'correspondencia', icon: 'forward_to_inbox'},
      ];
    }else if (perfil?.role === Roles.INQUILINO) {
      return [
        {name: 'Mural', link:'', icon: 'newspaper'},
        {name: 'Minha Unidade', link:'some-link', icon: 'maps_home_work'},
        {name: 'Reserva de Espaço', link: 'some-link', icon: 'event_available'},
        {name: 'Ocorrências', link: 'ocorrencia', icon: 'menu_book'},
        {name: 'Correspondência', link: 'correspondencia', icon: 'forward_to_inbox'},
      ];
    }else if (perfil?.role === Roles.FUNCIONARIO) {
      return [
        {name: 'Mural', link:'', icon: 'newspaper'},
        {name: 'Ocorrências', link: 'ocorrencia', icon: 'menu_book'},
        {name: 'Correspondência', link: 'correspondencia', icon: 'forward_to_inbox'},
        {name: 'Visitante', link: 'visitante', icon: 'group'},
      ];
    }
    return [];
  }
}
