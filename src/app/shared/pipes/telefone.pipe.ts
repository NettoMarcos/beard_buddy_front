import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
  standalone: true
})
export class TelefonePipe implements PipeTransform {

 transform(value: string | null | undefined): string {
    if (!value) return '';

    // Remove tudo que não é dígito
    const numeros = value.replace(/\D/g, '');

    // Formatação para números com DDD (11 dígitos para celular, 10 para fixo)
    if (numeros.length === 11) {
      // Celular: (XX) XXXXX-XXXX
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
      // Fixo: (XX) XXXX-XXXX
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 8) {
      // Número sem DDD: XXXX-XXXX (para fixo)
      if (numeros.startsWith('3')) {
        // Números especiais (3000-0000)
        return numeros.replace(/(\d{4})(\d{4})/, '$1-$2');
      } else {
        // Fixo local
        return numeros.replace(/(\d{4})(\d{4})/, '$1-$2');
      }
    } else if (numeros.length === 9) {
      // Celular sem DDD: 9XXXX-XXXX
      return numeros.replace(/(\d{5})(\d{4})/, '$1-$2');
    }

    // Retorna o valor original se não se encaixar nos padrões
    return value;
  }

}
