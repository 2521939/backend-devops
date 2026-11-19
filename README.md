# backend-devops

API backend em Node.js com Express, desenvolvida para a disciplina de **Ferramentas** (avaliação N3). O foco do projeto é praticar **CI/CD**, **workflows** e **pipelines** com GitHub Actions: a cada alteração no código, o pipeline roda o lint e os testes automaticamente.

## Tecnologias

| Ferramenta | Uso |
| --- | --- |
| Node.js | Ambiente de execução |
| Express 5 | Framework da API |
| Jest | Testes automatizados e relatório de cobertura |
| Supertest | Testes de requisições HTTP à API |
| Selenium WebDriver | Testes automatizados de interface |
| ESLint | Análise estática e padronização do código |
| GitHub Actions | Integração contínua (pipeline) |

## Estrutura do projeto

```
backend-devops/
├── .github/
│   └── workflows/        # Pipeline de CI do GitHub Actions
├── src/                  # Código da aplicação (entrada: src/app.js)
├── tests/                # Testes automatizados
├── eslint.config.mjs     # Configuração do ESLint
├── package.json          # Dependências e scripts
└── README.md
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recente)
- npm (já vem com o Node.js)
- Git

## Como executar

1. Clone o repositório:

```bash
git clone https://github.com/2521939/backend-devops.git
cd backend-devops
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
node src/app.js
```

> A porta e as rotas disponíveis estão definidas em `src/app.js`.

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm test` | Executa os testes com Jest e gera o relatório de cobertura |
| `npm run lint` | Verifica o código de `src/` com o ESLint |

## Testes

Os testes ficam na pasta `tests/` e rodam com o Jest. As rotas da API são testadas com o Supertest, sem precisar subir o servidor manualmente.

```bash
npm test
```

Ao final, o Jest mostra no terminal a cobertura de código (`--coverage`).

## Lint

O ESLint garante um padrão de código consistente e ajuda a achar erros antes da execução.

```bash
npm run lint
```

## CI/CD

O projeto usa **GitHub Actions**. O workflow fica em `.github/workflows/` e é executado automaticamente a cada alteração enviada ao repositório.

Etapas típicas do pipeline deste projeto:

1. Baixar o código do repositório
2. Configurar o Node.js
3. Instalar as dependências (`npm ci` ou `npm install`)
4. Rodar o lint (`npm run lint`)
5. Rodar os testes (`npm test`)

Se qualquer etapa falhar, o pipeline é marcado como reprovado, e o resultado pode ser acompanhado na aba **Actions** do repositório:
https://github.com/2521939/backend-devops/actions

## Autores

Projeto desenvolvido em grupo para a disciplina de Ferramentas.

- [@2521939](https://github.com/2521939)
- [João-Henrique-Ribeiro](https://github.com/Joao-Henrique-Ribeiro)
- [Gabriel Scatolino](https://github.com/GabrielScatolino)