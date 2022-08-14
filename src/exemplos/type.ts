type input = number | string // typescript oferece a possibilidade de criar um tipo

function somarValores(input1: input, input2: input){
  if(typeof input1 === "string" || typeof input2 === "string")
    return input1.toString() + input2.toString()
  else 
    return input1 + input2
}

console.log(somarValores(1, 5)) // soma
console.log(somarValores('ola', ', tudo bem?')) // concatenação
console.log(somarValores('que dia é hoje: ', 5)) // concatenação