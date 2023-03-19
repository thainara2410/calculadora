import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  numbers:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  operators:any[] = ['+', '-', '/', 'X'];
  display = '';
  firstval:number = NaN;
  operator: any = null;
  newcursor = false;
  isc = false;
  iscomma = false;

  click(val: any){
    this.display += val;
  }

  calcular(){
    const operadores = ['+', '-', 'X', '/'];
    let numeros: number[] = [];
    let operadoresEncontrados: string[] = [];
  
    let numeroAtual = '';
    let virgulaEncontrada = false;

    let str = this.display;
  
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
  
      if (operadores.includes(char)) {
        if (numeroAtual !== '') {
          numeros.push(parseFloat(numeroAtual.replace(',', '.')));
          numeroAtual = '';
          virgulaEncontrada = false;
        }
        operadoresEncontrados.push(char);
      } else if (char === ',') {
        if (virgulaEncontrada) continue;
        numeroAtual += char;
        virgulaEncontrada = true;
      } else {
        numeroAtual += char;
      }
    }
  
    if (numeroAtual !== '') {
      numeros.push(parseFloat(numeroAtual.replace(',', '.')));
    }
  
    // Loop para multiplicação e divisão
    for (let i = 0; i < operadoresEncontrados.length; i++) {
      const operador = operadoresEncontrados[i];
      const proximoNumero = numeros[i + 1];
  
      if (operador === 'X') {
        numeros[i] *= proximoNumero;
        numeros.splice(i + 1, 1);
        operadoresEncontrados.splice(i, 1);
        i--;
      } else if (operador === '/') {
        numeros[i] /= proximoNumero;
        numeros.splice(i + 1, 1);
        operadoresEncontrados.splice(i, 1);
        i--;
      }
    }
  
    let resultado = numeros[0];
  
    // Loop para adição e subtração
    for (let i = 0; i < operadoresEncontrados.length; i++) {
      const operador = operadoresEncontrados[i];
      const proximoNumero = numeros[i + 1];
  
      if (operador === '+') {
        resultado += proximoNumero;
      } else if (operador === '-') {
        resultado -= proximoNumero;
      }
    }
  
    console.log(resultado);
    this.display = `${resultado}`;
  }
}





