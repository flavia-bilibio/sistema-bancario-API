let { contas, depositos, saques, transferencias } = require('../bancodedados/bancodedados');

const fazerUmDeposito = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "É necessário informar o número da conta e o valor!" });
    } else if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor a ser depositado precisa ser maior que R$0,00." });
    }

    let conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    } else if (conta) {
        conta.saldo += Number(valor);
    }

    const novoDeposito = {
        data: new Date(),
        numero_conta,
        valor
    }

    depositos.push(novoDeposito);

    return res.status(204).json();
}

const fazerUmSaque = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "É necessário informar o número da conta, o valor e a senha!" });
    }

    let conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada é incorreta!" });
    }

    if (conta.saldo < valor) {
        return res.status(403).json({ mensagem: "Saldo insuficiente." });
    } else if (conta.saldo >= valor) {
        conta.saldo -= Number(valor);
    }

    const novoSaque = {
        data: new Date(),
        numero_conta,
        valor
    }

    saques.push(novoSaque);

    return res.status(204).json();
}

const fazerUmaTransferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: "É necessário informar a conta de origem, a conta de destino, o valor e a senha!" });
    }

    let contaOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem);
    });

    if (!contaOrigem) {
        return res.status(404).json({ mensagem: "A conta de origem informada não existe!" });
    }

    let contaDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino);
    });

    if (!contaDestino) {
        return res.status(404).json({ mensagem: "A conta de destino informada não existe!" });
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada é incorreta!" });
    }

    const checarSaldo = (contas.find((numero_conta_origem) => {
        return numero_conta_origem.saldo >= valor;
    }));

    if (!checarSaldo) {
        return res.status(403).json({ mensagem: "Saldo insuficiente." });
    }

    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);

    const novaTransferencia = {
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(novaTransferencia);

    res.status(204).json();
}

module.exports = {
    fazerUmDeposito,
    fazerUmSaque,
    fazerUmaTransferencia
}