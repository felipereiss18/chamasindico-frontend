import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {VisitanteService} from "../../../../services/visitante/visitante.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {BasicComponent} from "../../../../shared/basic-component/basic-component";
import {UserService} from "../../../../core/auth/user/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Visita} from "../../../../models/visita";
import {ConfirmationDialogModel} from "../../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../../shared/component/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-lista-visita',
  templateUrl: './lista-visita.component.html',
  styleUrls: ['./lista-visita.component.css']
})
export class ListaVisitaComponent extends BasicComponent implements OnInit {

  displayColumns: string[] = ['bloco', 'unidade', 'data', 'areaComum', 'acoes']
  dataSource: MatTableDataSource<Visita> = new MatTableDataSource<Visita>();

  constructor(
    private formBuilder: FormBuilder,
    private service: VisitanteService,
    public dialogRef: MatDialogRef<ListaVisitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService);
  }

  ngOnInit(): void {
    this.service.findOne(this.data).subscribe(
      (res) => {
        if(res.data.visitas) {
          this.dataSource.data = res.data.visitas;
        }else {
          this.messageInfo('Nenhuma visita encontrada.');
        }
      }, error => {
        console.error(error);
        this.messageError("Não foi possível carregar as visitas.")
      }
    )
  }

  deletar(date: Date) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza em excluir a visita da data ${this.formatarData(date)}?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.excluirVisita(this.data, date).subscribe(
          res => {
            this.messageSucess(`Visita excluída com sucesso!`);
            this.ngOnInit();
          }, error => {
            console.error(error);
            this.messageError('Erro ao excluir a visita.');
          }
        );
      }
    })
  }

  private formatarData(date: Date): string {
    const d = new Date(date)
    return d.toLocaleString().substring(0, d.toLocaleString().length-3);
  }
}
