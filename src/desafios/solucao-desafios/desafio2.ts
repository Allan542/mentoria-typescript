// Solução
enum Profissao{
  Atriz = 'Atriz',
  Padeiro = 'Padeiro'
}

interface Pessoa {
  nome: string
  idade: number
  profissao: Profissao
}

let pessoa1 = {} as Pessoa
pessoa1.nome = "maria"
pessoa1.idade = 29
pessoa1.profissao = Profissao.Atriz

let pessoa2 = {} as Pessoa
pessoa1.nome = "roberto"
pessoa1.idade = 19
pessoa1.profissao = Profissao.Padeiro

let pessoa3: Pessoa = {
  nome: "laura",
  idade: 32,
  profissao: Profissao.Atriz
}

let pessoa4: Pessoa = {
  nome: "carlos",
  idade: 19,
  profissao: Profissao.Padeiro
}