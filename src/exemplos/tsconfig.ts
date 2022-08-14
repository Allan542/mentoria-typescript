// tsconfig.json - target: Ele especifica qual o tipo de ecmascript você quer que seu compilador entenda, para assim o javascript compilar o código e transformar de acordo. (Javascripts antigos entendem até mesmo os ecma mais atuais)

// tsconfig.json - lib: []: Pode especificar quais bibliotecas você deseja usar, o padrão do ecma etc. Ex.: "lib": ["es2020", "DOM"]

// tsconfig.json - outDir: serve para especificar o diretório que deseja guardar o código javascript que foi compilado. Bastante útil para separar Javascript de Typescript

// tsconfig.json - rootDir: serve para especificar o diretório que está o código-fonte typescript a ser compilado.

// tsconfig.json - include: []: serve para incluir um argumento de que o tsconfig tem que buscar determinado diretório especificado nos colchetes. Pode também buscar globalmente com "**", para arquivo, *.extensao (.ts, .js, .c etc.)

// tsconfig.json - strictNullChecks: quando true, não permite nulos (null), como no caso do botão abaixo que precisou de uma "?". Quando falso, ele permite nulos sem a "?".

// tsconfig.json - noImplicityAny: Quando, falso permite any's implícitos, ou seja, permite que não precisa declarar o tipo da variável  como any, pois ela vai ser automaticamente.

// tsconfig.json - strict: Quando verdadeiro, ignora todas as strict type-checking, mesmo que forem verdadeiras.

let buttonTeste = document.getElementById('button')

// Quando noImplicityAny é falso
// function somarImplicito (parametro1, parametro2) {
//   return parametro1 + parametro2
// }

buttonTeste?.addEventListener('click', () => { // opcional transforma em ternário no javascript antigo
  console.log('Funcionou')
}) // ec2020



