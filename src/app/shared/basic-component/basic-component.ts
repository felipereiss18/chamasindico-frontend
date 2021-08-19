import {AbstractControl} from "@angular/forms";

export class BasicComponent {

  constructor() {
  }

  public getMessageError(control: AbstractControl, name?: string): string {
    if (control?.hasError('required')) {
      return 'Campo Obrigatório.'
    }

    return name + ' inválido';
  }
}
