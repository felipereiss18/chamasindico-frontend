import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  ConfirmationInputDialogModel,
  ConfirmationInputDialogOutputModel
} from "./model/confirmation-input-dialog.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Editor, Toolbar} from "ngx-editor";

@Component({
  selector: 'app-confirm-input-dialog',
  templateUrl: './confirm-input-dialog.component.html',
  styleUrls: ['./confirm-input-dialog.component.css']
})
export class ConfirmInputDialogComponent implements OnInit {
  title: string;
  message: string;

  editor: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];
  form: FormGroup;
  obrigatorio = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationInputDialogModel
  ) {
    this.editor = new Editor();
    this.title = data.title;
    this.message = data.message;
    this.form = this.formBuilder.group({dado: ['']})
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    if (this.form.controls.dado.value && this.form.controls.dado.value.length > 7) {
      this.dialogRef.close(new ConfirmationInputDialogOutputModel(true, this.form.controls.dado.value));
    }else {
      this.obrigatorio = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close(new ConfirmationInputDialogOutputModel(false, ''));
  }
}
