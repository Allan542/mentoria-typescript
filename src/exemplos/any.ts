let valorAny: any // Tipo any funciona como um javascript comum, pode atribuir muitos valores
valorAny = 3
valorAny = 'ola'
valorAny = true

let valorString: string = 'texto'
valorString = valorAny
let valorString2: string = 'textao'
valorString2 = valorAny

function somarString(string1: string, string2: string){
  console.log(string1 + string2)
}

somarString(valorString, valorString2) // retorna 2, pois após ser atribuido a string, foi a
somarString('Olá,', ' como vai?')