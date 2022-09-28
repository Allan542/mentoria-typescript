// quando você quer definir apenas uma estrutura de modelo e não algo mais complexo, uma interface é mais recomendada do que uma classe

interface Teste {
  nome: string,
  idade: number,
  dizerNome(): void
}

class Mamifero {
  public quantidadeDePatas: number
  public temPelos: boolean
  public nome: string

  constructor(quantidadeDepatas: number, temPelos: boolean, nome:string){
    this.quantidadeDePatas = quantidadeDepatas
    this.temPelos = temPelos
    this.nome = nome
  }

  public dizerNome() {
    console.log('Meu nome é ', this.nome)
  }
}

const cachorro = new Mamifero(4, true, 'Billy')
cachorro.temPelos

const object: Teste = {
  nome: "Allan",
  idade: 212312,
  dizerNome() {
    console.log("Meu nome é ", this.nome)
  },
}