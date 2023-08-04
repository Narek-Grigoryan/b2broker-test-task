import {AbstractControl, ValidatorFn} from "@angular/forms";

export function MaxItemsLengthValidator(count: number = 10): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return null;
    }

    const valid = control.value.length <= count;

    return valid ? null : { maxLength: true };
  };
}
