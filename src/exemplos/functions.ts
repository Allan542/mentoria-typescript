function printaValoresNumericos(numero1: number, numero2: number): void{ // tipo de função que não retorna nada
  console.log(numero1 + numero2)
}

// para declarar a função como parâmetro, é assim: (parâmetro: tipo do parâmetro) => tipo do retorno

function somarValoresNumericosTratar(numero1: number, numero2: number, callback: (numero: number) => number): number{ // definindo o tipo de retorno da função
  let resultado = numero1 + numero2
  return callback(resultado) // chamando a função callback declarada como parâmetro
}

function aoQuadrado(numero: number): number{
  return numero * numero
}

function dividirPorEleMesmo(numero: number): number{
  return numero / numero
}

console.log(somarValoresNumericosTratar(1, 3, aoQuadrado))
console.log(somarValoresNumericosTratar(1, 3, dividirPorEleMesmo))