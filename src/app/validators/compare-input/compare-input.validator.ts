import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function CompareInputValidator(confirmInput: string): ValidatorFn {

  let confirmInputControl: AbstractControl;
  let inputControl: FormControl;

  return (control: AbstractControl) => {
    if (!control.parent) {
      return null;
    }

    if (!confirmInputControl) {
      confirmInputControl = control;
      inputControl = control.parent.get(confirmInput) as FormControl;
      inputControl.valueChanges.subscribe(() => {
        confirmInputControl.updateValueAndValidity();
      });
    }

    if (inputControl.value !== confirmInputControl.value) {
      return {
        noMatch: true
      };
    }

    return null;
  };

}
