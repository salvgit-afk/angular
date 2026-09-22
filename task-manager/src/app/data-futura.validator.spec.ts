import { FormControl } from '@angular/forms';
import { dataFuturaValidator } from './data-futura.validator';

describe('dataFuturaValidator', () => {
  it('restituisce errore per una data passata', () => {
    const control = new FormControl('2000-01-01');
    expect(dataFuturaValidator(control)).toEqual({ dataPassata: true });
  });

  it('accetta una data futura', () => {
    const control = new FormControl('2999-01-01');
    expect(dataFuturaValidator(control)).toBeNull();
  });

  it('accetta il campo vuoto', () => {
    const control = new FormControl('');
    expect(dataFuturaValidator(control)).toBeNull();
  });
});