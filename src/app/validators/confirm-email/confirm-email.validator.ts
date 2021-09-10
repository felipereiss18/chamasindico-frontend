import {FormControl, ValidationErrors} from '@angular/forms';

export function ConfirmEmailValidator(confirmEmailInput: string): ValidationErrors {

  let confirmEmailControl: FormControl;
  let emailControl: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    if (!confirmEmailControl) {
      confirmEmailControl = control;
      emailControl = control.parent.get(confirmEmailInput) as FormControl;
      emailControl.valueChanges.subscribe(() => {
        confirmEmailControl.updateValueAndValidity();
      });
    }

    if (emailControl.value.toLocaleLowerCase() !== confirmEmailControl.value.toLocaleLowerCase()) {
      return {
        noMatch: true
      };
    }

    return null;
  };

}
