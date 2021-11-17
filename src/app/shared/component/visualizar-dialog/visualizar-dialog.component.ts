import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VisualizarDialogModel} from "./model/visualizar-dialog.model";

@Component({
  selector: 'app-visualizar-dialog',
  templateUrl: './visualizar-dialog.component.html',
  styleUrls: ['./visualizar-dialog.component.css']
})
export class VisualizarDialogComponent implements OnInit {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<VisualizarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VisualizarDialogModel
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
