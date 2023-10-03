## API- Sistema Bancário

Projeto desenvolvido no desafio de conclusão do Módulo 2 do curso de Desenvolvimento de Software com foco em Backend da Cubos Academy.
A API consiste em permitir a realização de simulação de operações bancárias e cadastrais pela conexão HTTP com o servidor local.

## 👩‍🔧 Linguagens e ferramentas 
- HTTP
- Javascript
- Vscode
- Git
- Insomnia
- Express

## 🚩 Contribua com o projeto
- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

## Funcionalidades do projeto
- Listar contas bancárias
- Criar nova conta bancária
- Atualizar usuário de conta bancária
- Excluir conta bancária
- Fazer depósitos
- Fazer saques
- Fazer transferências
- Mostrar saldo
- Emitir Extrato

## Rodando o projeto
### 1. Clone o projeto

HTTPS:
https://github.com/flavia-bilibio/sistema-bancario-API.git

SSH:
git clone git@github.com:flavia-bilibio/sistema-bancario-API.git

### 2. Instale as dependências
- npm install express
- npm install -D nodemon

### 3. Execute o backend
npm run dev

## Exemplo de uso da API utilizando Insomnia
- Mostrando saldo de conta através do Endpoint GET /contas/saldo. Enviando as requisições na URL (query).
![image](https://github.com/flavia-bilibio/sistema-bancario-API/assets/141366732/7c42b8a5-343c-4115-a8a9-b26f1b5c16e2)

- Criando conta bancária através do Endpoint POST /contas. Enviando as requisições no body em formato JSON.
![insomnia jpeg](https://github.com/flavia-bilibio/sistema-bancario-API/assets/141366732/86965795-e0cd-4bfa-b448-160e2ce87279)

- Atualizando usuário de conta bancária através do Endpoint PUT /conta/:numeroConta/usuario. Enviando as requisições no body em formato JSON.
![image](https://github.com/flavia-bilibio/sistema-bancario-API/assets/141366732/761d58fc-a622-41e3-abd9-0bede00fc38d)

- Excluindo conta bancária através do Endpoit DELETE /contas/:numeroConta. Enviando a requisição na URL (params).
![image](https://github.com/flavia-bilibio/sistema-bancario-API/assets/141366732/0ca85961-2ac0-4b6d-8057-da97051f530f)

## 👩‍💻 Endpoints
- GET /contas - Listar contas bancárias
- POST /contas - Criar nova conta bancária
- PUT /contas/:numeroConta/usuario - Atualizar usuário de conta bancária
- DELETE /contas/:numeroConta - Excluir conta bancária
- POST /transacoes/depositar - Fazer depósitos
- POST /transacoes/sacar - Fazer saques
- POST /transacoes/transferir - Fazer transferências
- GET /contas/saldo - Mostrar saldo
- GET /contas/extrato - Emitir extrato

## 🖋️ Autora e contribuidores
Flavia Bilibio
