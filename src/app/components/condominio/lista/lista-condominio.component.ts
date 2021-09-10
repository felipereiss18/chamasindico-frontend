import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Condominio} from "../../../models/condominio";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Estado} from "../../../models/estado";
import {EstadoService} from "../../../services/estado/estado.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-lista-condominio',
  templateUrl: './lista-condominio.component.html',
  styleUrls: ['./lista-condominio.component.css']
})
export class ListaCondominioComponent extends BasicComponent implements OnInit {

  displayColumns: string[] = ['nome', 'cnpj', 'cidade', 'estado', 'acoes']
  dataSource: MatTableDataSource<Condominio> = new MatTableDataSource<Condominio>();

  consultarForm: FormGroup = this.formBuilder.group({
    nome: [null],
    cidade: [null],
    estado: [null],
  })

  estados: Estado[] = [];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private estadoService: EstadoService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService
  ) {
    super(snipperService, snotifyService);
    estadoService.gets('estados').subscribe(
      (res) => {
        this.estados = res.data
      },
      error => {
        this.messageError('Ocorreu um erro em buscar os Estados');
        console.error(error)
      }
    )
  }

  ngOnInit(): void {
  }

  pesquisar() {
    this.showLoading();
    this.closeLoading();
  }

  adicionar(){
    this.router.navigate(['condominio/adicionar'])
  }
}
