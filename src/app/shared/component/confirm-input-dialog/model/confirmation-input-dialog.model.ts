export class ConfirmationInputDialogModel {
  constructor(public title: string, public message: string) {
  }
}

export class ConfirmationInputDialogOutputModel {
  constructor(public confirmacao: boolean, public dado: string) {
  }
}
