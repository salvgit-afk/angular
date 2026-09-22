import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dataFuturaValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);
  return new Date(control.value) < oggi ? { dataPassata: true } : null;
}