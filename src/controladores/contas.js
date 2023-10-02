let { banco, contas, identificadorContas, depositos, saques, transferencias } = require('../bancodedados/bancodedados');

const listarContasBancarias = (req, res) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: "É necessário informar a senha do banco." });
    }

    if (senha_banco !== banco.senha) {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida." });
    }

    return res.status(200).json(contas);
}

const criarContaBancaria = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "É necessário informar nome, cpf, data de nascimento, telefone, e-mail e senha." });
    }

    const verificarCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    if (verificarCpf) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o CPF informado." });
    }

    const verificarEmail = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    if (verificarEmail) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o e-mail informado." });
    }

    const novaConta = {
        numero: identificadorContas++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta);

    return res.status(201).json();
}

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const { numeroConta } = req.params;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "É necessário informar nome, cpf, data de nascimento, telefone, e-mail e senha." });
    }

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    const verificarCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    if (verificarCpf) {
        return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!" });
    }

    const verificarEmail = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    if (verificarEmail) {
        return res.status(400).json({ mensagem: "O e-mail informado já existe cadastrado!" });
    }

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(204).json();
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    if (conta) {
        if (conta.saldo !== 0) {
            return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
        }
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    });

    return res.status(204).json();
}


const obterSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "É necessário informar a conta e a senha!" });
    }

    let conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    let verificarSenha = contas.find((numero_conta) => {
        return numero_conta.usuario.senha === senha;
    });

    if (!verificarSenha) {
        return res.status(401).json({ mensagem: "A senha informada é incorreta!" });
    }

    return res.status(200).json({ mensagem: `saldo: ${conta.saldo}` });
}

const emitirExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "É necessário informar a conta e a senha!" });
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

    const depositosConta = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    });

    const saquesConta = saques.filter((saque) => {
        return saque.numero_conta === numero_conta;
    });

    const transfereciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    });

    const transfereciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    return res.status(200).json({ depositosConta, saquesConta, transfereciasEnviadas, transfereciasRecebidas });
}

module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarUsuario,
    excluirConta,
    obterSaldo,
    emitirExtrato
}