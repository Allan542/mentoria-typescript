let anyEstaDeVolta: any
anyEstaDeVolta = 3
anyEstaDeVolta = 'teste'
anyEstaDeVolta = 5

let stringTeste: string = 'verificar'
stringTeste = anyEstaDeVolta

let unknownValor: unknown // A diferença entre unknown e any é que o unknown é uma "boa prática" que o any devia ser.
// Para atribuir um valor unknown/desconhecido a outra variável com tipo fixo (string, etc.), precisa de uma validação

unknownValor = 3
unknownValor = 'opa'
unknownValor = true
unknownValor = 'vai sim'

let stringTeste2: string = 'agora vai'

if(typeof unknownValor === 'string'){
  stringTeste2 = unknownValor
}

function jogaErro(erro: string, codigo: number): never { // tipo never é um código que nunca é finalizado, interrompido abruptamente no meio, que nunca finalizou
  throw {error: erro, code: codigo}
}

jogaErro('deu erro', 500)