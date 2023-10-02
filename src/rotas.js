const express = require('express');
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');

const rotas = express();

rotas.get('/contas', contas.listarContasBancarias);
rotas.post('/contas', contas.criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', contas.atualizarUsuario);
rotas.delete('/contas/:numeroConta', contas.excluirConta);
rotas.post('/transacoes/depositar', transacoes.fazerUmDeposito);
rotas.post('/transacoes/sacar', transacoes.fazerUmSaque);
rotas.post('/transacoes/transferir', transacoes.fazerUmaTransferencia);
rotas.get('/contas/saldo', contas.obterSaldo);
rotas.get('/contas/extrato', contas.emitirExtrato);

module.exports = rotas;