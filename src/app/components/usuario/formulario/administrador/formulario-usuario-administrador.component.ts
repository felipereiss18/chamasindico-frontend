import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BasicComponent} from "../../../../shared/basic-component/basic-component";
import {UserService} from "../../../../core/auth/user/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UsuarioService} from "../../../../services/usuario/usuario.service";
import {PerfilService} from "../../../../services/perfil/perfil.service";
import {CompareInputValidator} from "../../../../validators/compare-input/compare-input.validator";
import {Usuario} from "../../../../models/usuario";
import {Roles} from "../../../../core/auth/user/roles.enum";
import {Perfil} from "../../../../core/auth/user/perfil";

@Component({
  selector: 'app-formulario-usuario-administrador',
  templateUrl: './formulario-usuario-administrador.component.html',
  styleUrls: ['./formulario-usuario-administrador.component.css']
})
export class FormularioUsuarioAdministradorComponent extends BasicComponent implements OnInit {

  formUsuario: FormGroup
  title: string;
  private tipo: number;
  id: number;
  private perfil: Perfil;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    userService: UserService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
  ) {
    super(spinnerService, snotifyService, userService);

    this.title = activeRoute.snapshot.data['title'] + ' Usuário';
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.perfil = {} as Perfil;

    perfilService.buscarPorRole(Roles.ADMIN).subscribe(
      res => this.perfil = res.data,
      error => {
        console.error(error);
      }
    )

    this.formUsuario = formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
      confirmaSenha: ['', [Validators.required, CompareInputValidator('senha')]]
    });

  }

  ngOnInit(): void {

    if(this.id){
      this.usuarioService.findOne(this.id).subscribe(
        (res) => {
          this.formUsuario.controls.usuario.setValue(res.data.nome);
        }, error => {
          console.error(error);
          this.messageError('Não foi possível carregas as informações do usuário.')
        }
      );
      this.formUsuario.removeControl('senha')
      this.formUsuario.removeControl('confirmaSenha');
    }

  }

  salvar(): void {

    if(this.formUsuario.valid) {

      const usuario = new Usuario(
        this.formUsuario.controls.usuario.value,
        this.perfil,
        true,
        this.id ? this.id : undefined,
        !this.id ? this.formUsuario.controls.senha.value : null,
      )
      if (this.id) {
        this.edit(this.id, usuario)
      } else {
        this.save(usuario);
      }
    }

  }

  private edit(id: number, usuario: Usuario) {
    this.usuarioService.update(id, usuario).subscribe(
      (res) => {
        this.messageSucess('Usuário alterado com sucesso.')
        this.router.navigate(['usuario']);
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro no alterar usuário.')
      }
    )
  }

  private save(usuario: Usuario) {
    this.usuarioService.save(usuario).subscribe(
      (res) => {
        this.messageSucess('Usuário salvo com sucesso.');
        this.router.navigate(['usuario']);
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro no salvar usuário.')
      }
    )
  }
}
