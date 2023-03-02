import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  display = '';
  firstval:number = NaN;
  operator: any = null;
  newcursor = false;
  isc = false;
  iscomma = false;
  operators:any[] = ['+', '-', '/', 'X'];
  numbers:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  hist='';

  constructor() {}

  click(val: any) {
    //se val for um numero
    if(this.numbers.includes(val))
    {
      this.addnumber(val)
      console.log("é um número!")
    }
    //se val for um operador
    else if(this.operators.includes(val))
    {
      this.addoperator(val);
      console.log("soy um operator!")
    }
    //se val for uma igualdade(=)
    else if(val == '=')
    {
      if (this.firstval !== null && this.operator !== null) 
      {
        this.calclast();
      }
      this.operator = null;
    }
    //se val for uma vírgula
    else if(val == ',')
    {
      this.addcomma()
    }
    else if(val == 'ac'){
      this.display = '0';
      this.firstval = NaN;
      this.operator = null;
      this.newcursor = false;
      this.hist = '';
    }
    else if(val =='c'){
      this.display = '0';
      this.isc = false;
    }
    else{
      console.log("passei direto de tudo!")
    }
  }

  addcomma() {
    if (this.iscomma === false) {
      this.iscomma = true;
    } else {
      this.iscomma = false;
    }
  }

  addnumber(nbr: string) {
    if (nbr === '0') {
      //se o input estiver vazio
      if (this.newcursor === true) {
        this.display = nbr;
        this.newcursor = false;
      //se o que tem no display é diferente de 0
      } else if (this.display !== '0') {
        //se o que está no final do display é uma virgula
        if (this.iscomma === true) {
          this.display = `${this.display.toString()}.${nbr}`;
        //se o que está no final não é virgula
        } else {
          this.display = this.display.toString() + nbr;
        }
      //se o que está no display é um 0
      } else if (this.display === '0') {
        //se o que tem no fim do display é uma virgula
        if (this.iscomma === true) {
          this.display = `${this.display.toString()}.${nbr}`;
        }
      }
    //nbr não é 0
    } else {
      // se o input está limpo
      if (this.newcursor === true) {
        this.display = nbr;
        this.newcursor = false;
      } 
      //se o display for igual a 0
      else if (this.display === '0') {
        //se o que tem no fim é uma virgula
        if (this.iscomma === true) {
          //se existir virgula no display que não no fim EX: 1.8
          if (this.display.toString().indexOf('.') > -1) {
            this.display = this.display.toString() + nbr;
          } 
          //se não existir ficaria assim (0.0...)
          else {
            this.display = `${this.display.toString()}.${nbr}`;
          }
        }
        //se o que tava no display era apenas 0 ele é desconsiderado
         else {
          this.display = nbr;
          console.log("passei por aqui")
        }
      //se o input não está vazio nem é igual a 0
      } else {
        //se no final tem uma virgula
        if (this.iscomma === true) {
          //se tem virgula anteriormente
          if (this.display.toString().indexOf('.') > -1) {
            this.display = this.display.toString() + nbr;
          } 
          //se não tem virgula anteriormente
          else {
            this.display = `${this.display.toString()}.${nbr}`;
          }
        }
        //se naão tem vírgula no final
        else {
          this.display = this.display.toString() + nbr;
        }
      }
    }
    //já existe texto
    this.isc = true;
  }

  addoperator(op: string) {
    //se 
    console.log('newcursor=',this.newcursor, 'firstval= ', this.firstval, 'iscomma= ', this.iscomma)
    if (this.newcursor === false) {
      if (Number.isNaN(this.firstval)) {
        if (this.iscomma === true) {
          this.firstval = parseFloat(this.display);
        } else {
          this.firstval = parseInt(this.display, 0);
          console.log('passei aqu dentro de operador');
        }
      }
      if (!Number.isNaN(this.firstval) && this.operator !== null) {
        this.calclast();
      }
    }
    this.iscomma = false;
    this.operator = op;
    this.newcursor = true;
  }

  calclast() {
    switch (this.operator) {
      case '/':
        if (this.iscomma === true) {
          this.firstval = (this.firstval / parseFloat(this.display));
        } else {
          this.firstval = (this.firstval / parseInt(this.display, 0));
        }
        break;
      case 'X':
        if (this.iscomma === true) {
          this.firstval = (this.firstval * parseFloat(this.display));
        } else {
          this.firstval = (this.firstval * parseInt(this.display, 0));
        }
        break;
      case '-':
        if (this.iscomma === true) {
          this.firstval = (this.firstval - parseFloat(this.display));
        } else {
          this.firstval = (this.firstval - parseInt(this.display, 0));
        }
        break;
      case '+':
        if (this.iscomma === true) {
          this.firstval = (this.firstval + parseFloat(this.display));
        } else {
          this.firstval = (this.firstval + parseInt(this.display, 0));
        }
        break;
    }
    this.display = this.firstval.toString();
  }

}

