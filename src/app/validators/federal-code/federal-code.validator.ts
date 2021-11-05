import {AbstractControl, ValidationErrors} from '@angular/forms';
import {cnpj, cpf} from 'cpf-cnpj-validator';

/**
 * Valida se o CPF fornecido é valido.
 */
export function CPFValidator(control: AbstractControl): ValidationErrors | null {

  if (!control.parent) {
    return null;
  }

  if ((control.value.trim()) && (!cpf.isValid(control.value.replace(/[^0-9]/gm, '')))) {
    return {
      cpfValid: true
    };
  }

  return null;
}

export function CNPJValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.parent) {
    return null;
  }

  if ((control.value.trim()) && (!cnpj.isValid(control.value.replace(/[^0-9]/gm, '')))) {
    return {
      cnpjValid: true
    };
  }

  return null;
}
