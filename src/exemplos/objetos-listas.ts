// const pessoa = { // Objeto definido por inferência, sem declaração de tipo
//   nome: 'Mariana',
//   idade: 28,
//   profissao: 'Desenvolvedora'
// }

// pessoa.idade = 25

// const andre: {nome: string, idade: number, profissao: string} = { // objeto explicito
//   nome: 'Andre',
//   idade: 25,
//   profissao: 'Pintor'
// } // Objeto usando typescript

// const paula: {nome: string, idade: number, profissao: string} = {
//   nome: 'Andre',
//   idade: 25,
//   profissao: 'pintor'
// }

// enum Profissao { // Enum serve para padronizar diferentes formas de escrever, como no exemplo acima que tem um "Pintor" e um "pintor". Enum vai resolver este problema
//   Professora,
//   Atriz,
//   Desenvolvedora,
//   JogadorDeFutebol
// }

// interface Pessoa{ // Profissão opcional e recebendo como tipo o enum Profissao
//   nome: string
//   idade: number
//   profissao?: Profissao
// }

// interface Estudante extends Pessoa {
//   materias: string[]
// }

// const vanessa : Pessoa = {
//   nome: 'Vanessa',
//   idade: 23,
//   profissao: Profissao.Desenvolvedora
// }

// const maria : Pessoa = {
//   nome: 'Maria',
//   idade: 23,
//   profissao: Profissao.Desenvolvedora
// }

// const jessica: Estudante = {
//   nome: 'Jéssica',
//   idade: 28,
//   profissao: Profissao.Desenvolvedora,
//   materias: ['Mátemática discreta', 'programação']
// }

// const monica: Estudante = { // Profissão opcional
//   nome: 'Jéssica',
//   idade: 28,
//   materias: ['Mátemática discreta', 'programação']
// }

// function listar(lista: string[]) {
//   for (const item of lista) {
//     console.log('- ', item)
//   }
// }

// listar(monica.materias)