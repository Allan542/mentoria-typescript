// // Solução

// Variáveis globais
let apiKey: string = 'dda1371a9f069ebaec9d3ac93cb60879'
let requestToken: any
let username: string
let password: string
let sessionId: any = null
let listId: string // lista para teste - 8213507
let autenticado: boolean
let nomeLista: string
let descricao: string
let movieId: number

// login
let campoUsername = document.getElementById('login') as HTMLInputElement
let campoPassword = document.getElementById('senha') as HTMLInputElement
let campoApiKey = document.getElementById('api-key') as HTMLInputElement
let loginButton = document.getElementById('login-button') as HTMLButtonElement

// busca
let searchButton = document.getElementById('search-button') as HTMLButtonElement
let searchContainer = document.getElementById('search-container') as HTMLDivElement

// option lista
let opcCriarLista = document.getElementById('opc-criar-lista') as HTMLInputElement
let opcMostrarLista = document.getElementById('opc-mostrar-lista') as HTMLInputElement

// container cria lista
let campoNomeLista = document.getElementById('campo-nome-lista') as HTMLInputElement
let campoDescricaoLista = document.getElementById('campo-descricao-lista') as HTMLInputElement
let criarListaButton = document.getElementById('criar-lista') as HTMLButtonElement
let repostaLista = document.getElementById('resposta-lista') as HTMLParagraphElement

// container mostra lista
let campoIdMostraLista = document.getElementById('campo-id-mostra-lista') as HTMLInputElement
let mostrarListaButton = document.getElementById('mostrar-lista') as HTMLButtonElement

// adiciona/remove da lista
let campoBuscaMovieId = document.getElementById('busca-movie-id') as HTMLInputElement
let movieButton = document.getElementById('movie-button') as HTMLButtonElement
let listaContainer = document.getElementById('lista-container') as HTMLDivElement
let clearListButton = document.getElementById('clear-list-button') as HTMLButtonElement

// deleta lista
let campoBuscaListaId = document.getElementById('busca-lista-id') as HTMLInputElement
let delListButton = document.getElementById('del-list-button') as HTMLButtonElement

// lista para receber a pesquisa


// inicaliza as validações dos options
selectOptionList()
selectOptionMovie()


// Eventos dos botões
loginButton.addEventListener('click', async () => {

  await criarRequestToken()
  await autenticaRequestToken
  await logar()
  await criarSessao()
  await carregarListaFilmes()

  campoUsername.value = ''
  campoPassword.value = ''
  campoApiKey.value = ''
  habilitaCriarLista(autenticado)
})

searchButton.addEventListener('click', async () => {
  let query = document.getElementById('search') as HTMLInputElement
  let listaDeFilmes: any = await procurarFilme(query.value)
  let ul = document.createElement('ul')
  ul.id = "lista"

  if(searchContainer.children[2]){
    if(searchContainer.children[2].childElementCount > 0) {
      searchContainer.children[2].remove()
    }
  }

  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`Nome do filme: ${item.original_title} / Id: ${item.id}`))
    ul.appendChild(li)
  }
  console.log(listaDeFilmes)
  searchContainer.appendChild(ul)
})

criarListaButton.addEventListener('click', async () => {
  await criarLista(nomeLista, descricao)
  await carregarListaFilmes()
  campoNomeLista.value = ''
  campoDescricaoLista.value = ''
})

mostrarListaButton.addEventListener('click', async () => {
  await carregarListaFilmes()
})

movieButton.addEventListener('click', async () => {
  if(listId){
    let listarLista: any = await pegarLista()
    let existeNaLista: boolean = false

    for (const item of listarLista.items){
      if(movieId == item.id){
        console.log(item.id)
        existeNaLista = true
        break
      }
    }
    if (movieButton.innerHTML === "Adicionar filme"){
      await adicionarFilmeNaLista(movieId, listId)
    } else {
      if (existeNaLista) await removerFilmeNaLista(movieId, listId)
    }
    await carregarListaFilmes()
  }
  campoBuscaMovieId.value = ''
})

clearListButton.addEventListener('click', async () => {
  if(listId){
    let confirmar:boolean = confirm('Deseja mesmo limpar a lista?')
    if (confirmar) await limparLista(confirmar)
    await carregarListaFilmes()
  }
})

delListButton.addEventListener('click', async () => {
  if(listId){
    let confirmar:boolean = confirm('Deseja mesmo deletar a lista?')
    if (confirmar) await deletarLista()
    await carregarListaFilmes()
  }
  campoBuscaListaId.value = ''
})


// Funções da área de login
function preencherSenha() {
  password = campoPassword.value.trim()
  validateLoginButton()
}

function preencherLogin() {
  username = campoUsername.value.trim()
  validateLoginButton()
}

function preencherApi() {
  apiKey = campoApiKey.value.trim()
  validateLoginButton()
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false
  } else {
    loginButton.disabled = true
  }
}

// Função para mostrar opções de lista
function habilitaCriarLista(validaAcesso: boolean){
  if (validaAcesso) {
    listaContainer.hidden = false
  }
}

// Option para selecionar a opção de criar ou mostrar lista
function selectOptionList(){
  if (opcCriarLista.checked){
    campoNomeLista.hidden = false
    campoDescricaoLista.hidden = false
    criarListaButton.hidden = false

    campoIdMostraLista.hidden = true
    mostrarListaButton.hidden = true
  } else {
    campoIdMostraLista.hidden = false
    mostrarListaButton.hidden = false

    campoNomeLista.hidden = true
    campoDescricaoLista.hidden = true
    criarListaButton.hidden = true
  }
}

// Funções de validação da parte de criação de lista
function preencherNomeLista() {
  if (opcCriarLista.checked) nomeLista = campoNomeLista.value.trim()
  validateCriarListaButton()
}

function preencherDescricaoLista() {
  if (opcCriarLista.checked) descricao = campoDescricaoLista.value.trim()
  validateCriarListaButton()
}

function validateCriarListaButton() {
  if(nomeLista && descricao && opcCriarLista.checked) criarListaButton.disabled = false
  else criarListaButton.disabled = true
}

// Funções de validações da parte de mostrar lista
function preencherIdMostraLista() {
  if (opcMostrarLista.checked) listId = campoIdMostraLista.value.trim()
  validateMostrarListaButton()
}

function validateMostrarListaButton() {
  if (listId && opcMostrarLista.checked) mostrarListaButton.disabled = false
  else mostrarListaButton.disabled = true
}

// Função para carregar a lista caso tenha sido criada
async function carregarListaFilmes(){
  let idLista = document.getElementById("id-lista") as HTMLHeadElement
  let descricaoLista = document.getElementById("descricao-lista") as HTMLParagraphElement
  let ul = document.createElement('ul')

  try{
    if(listId){
      let mostrarLista: any = await pegarLista()
  
      idLista.innerHTML = `Lista: ${mostrarLista.name} - ${listId}`
      descricaoLista.innerHTML = `Descrição: ${mostrarLista.description}` 
      ul.id = "lista-criada"
      for (const item of mostrarLista.items){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(`Nome do filme: ${item.original_title} - ID: ${item.id}`))
        ul.appendChild(li)
      }
      console.log(mostrarLista)
      descricaoLista.appendChild(ul)
    }
    else {
      idLista.innerHTML = ""
      descricaoLista.innerHTML = ""
      ul.remove()
    }
  } catch(e){
    alert('Lista não existe ou não foi criada!')
    console.log(e)
  }
}

// Funções para validação da parte de adicionar ou remover filme
function preencherFilmeId() {
  movieId = Number(campoBuscaMovieId.value)
  validateMovieButton()
}

function validateMovieButton() {
  if (movieId) {
    movieButton.disabled = false
  } else {
    movieButton.disabled = true
  }
}

// Option para selecionar a adição ou remoção de um filme na lista
function selectOptionMovie(){
  let addMovie = document.getElementById('add-movie') as HTMLInputElement
  let rmMovie = document.getElementById('rm-movie') as HTMLInputElement

  if (addMovie.checked){
    movieButton.innerHTML = addMovie.value
  } else {
    movieButton.innerHTML = rmMovie.value
  }
}

// Funções para validações da área de deletar lista
function preencherBuscaListaId() {
  listId = campoBuscaListaId.value.trim()
  validateDelListButton()
}

function validateDelListButton() {
  if (listId) {
    delListButton.disabled = false
  } else {
    delListButton.disabled = true
  }
}

// Classe para pegar informações da API
class HttpClient {
  static async get({url, method, body = null}: any) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest()
      request.open(method, url, true)

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText))
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=utf-8")
        body = JSON.stringify(body)
      }
      request.send(body)
    })
  }
}

// Funções para manipular dados da API

// Função de busca
async function procurarFilme(query: any) {
  query = encodeURI(query)
  console.log(query)
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

// não entendi o propósito desta função
async function adicionarFilme(filmeId: number) { 
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result)
}

// Funções para autenticação de sessão/login
async function criarRequestToken () {
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
  console.log('Request-token: ', requestToken)
}

async function autenticaRequestToken () {
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET",
    body: {
      request_token: `${requestToken}`
    }
  })
  console.log(result)
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result:any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "POST"
  })
  sessionId = result.session_id
  if (sessionId) autenticado = true
  console.log('Sessão: ', sessionId)
}

// Funções para manipular lista
async function criarLista(nomeDaLista:string, descricao:string) {
  let result:any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  if (result){
    listId = result.list_id
    repostaLista.outerHTML = `Lista Criada com sucesso! Anote o ID para não perder: ${listId}`
  } 
  console.log(result)
}

async function adicionarFilmeNaLista(filmeId:number, listaId:string) {
  let result:any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result)
}

async function removerFilmeNaLista(filmeId:number, listaId:string) {
  let result:any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/remove_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result)
}

async function pegarLista() {
  let result:any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  return result
}

async function limparLista(confirm: boolean) {
  let result:any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}/clear?api_key=${apiKey}&session_id=${sessionId}&confirm=${confirm}`,
    method: "POST"
  })
  alert('Lista limpada com sucesso!')
  console.log(result)
}

// Coloquei só para testar, mas parece que infelizmente ele tá dando erro da própria API, só que ainda é possível deletar a lista
async function deletarLista(){ 
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&session_id=${sessionId}`,
    method: "DELETE"
  })
  listId = ''
  console.log('Deletar: ', result)
  alert('Lista deletada com sucesso!')
}