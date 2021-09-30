import {AbstractControl, ValidationErrors} from '@angular/forms';

export function telefoneNumeroRepetidoValidator(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if (!value) {
      return null;
    }

    let telefone = value.toString().trim();

    telefone = telefone.match(/(\d)/gm).join().replaceAll(',', '');

    const regex = telefone.length === 10 ? new RegExp(/^(\d)\1{9}/gm) : new RegExp(/^(\d)\1{10}/gm);

    if (regex.test(telefone)) {
      return {numeroRepetido: true};
    }

    return null;
}
