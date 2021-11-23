import {Component, OnInit} from '@angular/core';
import {CorrespondenciaService} from "../../../services/correspodencia/correspondencia.service";
import {CorrespondenciaPesqResp} from "../../../interfaces/pesquisa/correspondencia-pesquisa";

@Component({
  selector: 'app-ativos-correspondencia',
  templateUrl: './ativos-correspondencia.component.html',
  styleUrls: ['./ativos-correspondencia.component.css']
})
export class AtivosCorrespondenciaComponent implements OnInit {

  correspondencias: CorrespondenciaPesqResp[] = [];

  constructor(
    private service: CorrespondenciaService,
  ) { }

  ngOnInit(): void {
    this.service.buscarAtivos().subscribe(
      (res) => {
        if(res && res.data) {
          this.correspondencias = res.data;
        }
      }, error => {
        console.error(error);
      }
    )
  }

}
