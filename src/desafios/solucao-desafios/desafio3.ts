// Solução
let botaoAtualizar = document.getElementById('atualizar-saldo')
let botaoLimpar = document.getElementById('limpar-saldo')
let soma = document.getElementById('soma') as HTMLInputElement
let campoSaldo = document.getElementById('campo-saldo') as HTMLInputElement

campoSaldo.innerHTML = '0'

function somarAoSaldo(soma: number):void {
    campoSaldo.innerHTML = soma.toString()
}

function limparSaldo(): void {
    campoSaldo.innerHTML = '0'
}

botaoAtualizar?.addEventListener('click', function () {
    somarAoSaldo(Number(soma.value))
})

botaoLimpar?.addEventListener('click', function () {
    limparSaldo();
})