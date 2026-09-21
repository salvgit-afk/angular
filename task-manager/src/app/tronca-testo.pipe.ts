import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'troncaTesto',
  standalone: true
})
export class TroncaTestoPipe implements PipeTransform {
  transform(valore: string, limite: number = 20): string {
    if (!valore) return '';
    return valore.length > limite ? valore.substring(0, limite) + '...' : valore;
  }
}