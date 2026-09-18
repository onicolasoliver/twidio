cd $env:USERPROFILE\Desktop\twidio

@'
const fs = require('fs');

const md = `# TwiDIO — Desafio TDD

API REST de posts construída com **Node.js + TypeScript** seguindo **TDD** estrito e arquitetura em camadas (Repository → Service → Controller).

Projeto de resolução do desafio proposto na plataforma DIO.

## Stack

- Runtime: Node.js 20
- Linguagem: TypeScript 5 (strict)
- ORM: TypeORM + SQLite
- Testes: Jest + ts-jest
- Metodologia: TDD (Red → Green → Refactor)

## Arquitetura

\\\`\\\`\\\`
src/
├── __mocks__/
│   ├── getEntityManagerMock.ts
│   ├── mockRequest.ts
│   └── mockResponse.ts
├── entities/
│   └── Post.ts
├── repositories/
│   └── PostRepository.ts
├── services/
│   └── SavePostService.ts
├── controllers/
│   └── SavePostController.ts
└── tests/
    ├── PostRepository.test.ts
    ├── SavePostService.test.ts
    ├── SavePostController.test.ts
    └── integration/
        └── savePost.integration.test.ts
\\\`\\\`\\\`

Cada camada tem teste próprio. Os testes unitários usam mocks da camada inferior para isolar o alvo; o teste de integração sobe um SQLite em memória e exercita a cadeia completa Controller → Service → Repository → banco.

## Como rodar

\\\`\\\`\\\`bash
git clone https://github.com/onicolasoliver/twidio.git
cd twidio
npm install
\\\`\\\`\\\`

## Testes

\\\`\\\`\\\`bash
npm test
npm run test:watch
npm run test:cov
npm run test:e2e
\\\`\\\`\\\`

Resultado atual:

\\\`\\\`\\\`
Test Suites: 4 passed, 4 total
Tests:       11 passed, 11 total
\\\`\\\`\\\`

## Fluxo TDD

Cada arquivo nasceu de um teste vermelho.

1. PostRepository — verifica que save chama create + save do repositório TypeORM com os argumentos corretos; e que findAll retorna o array persistido. Inclui caso de erro propagado do banco.
2. SavePostService — verifica regras de negócio: campos obrigatórios (title, content, author) e limite de 5000 caracteres no conteúdo. Garante que o repositório não é chamado quando a validação falha.
3. SavePostController — verifica o mapeamento HTTP: corpo da requisição vira input do service, retorno vira 201 com o post salvo, e erro do service vira 400 com { error }.
4. Integração — sobe SQLite real (in-memory), monta a cadeia completa e confirma que o post foi persistido de verdade e que payload inválido retorna 400 sem tocar no banco.

## Entidade Post

| Campo     | Tipo   | Restrição             |
|-----------|--------|-----------------------|
| id        | uuid   | chave primária        |
| title     | string | obrigatório           |
| content   | string | obrigatório, max 5000 |
| author    | string | obrigatório           |
| createdAt | Date   | preenchido pelo ORM   |

## Decisões técnicas

- strict: true — entidades usam "!" nas propriedades porque o TypeORM as preenche em runtime, não no construtor.
- experimentalDecorators + emitDecoratorMetadata — necessários para os decorators do TypeORM.
- isolatedModules: false no ts-jest — força o uso dos decorators legados exigidos pelo TypeORM em vez do formato TC39 do TypeScript 5.
- esModuleInterop: true — permite imports default de pacotes CommonJS.

## Próximos passos

- Rota HTTP POST /api/posts plugando o SavePostController em Express.
- Segundo use case ListPostsService reaproveitando o findAll do repository.
- Badge de cobertura no README via Codecov.
`;

fs.writeFileSync('README.md', md, 'utf8');
console.log('README.md escrito:', md.length, 'bytes');
'@ | Out-File -Encoding utf8 gerar-readme.js

node gerar-readme.js
Remove-Item gerar-readme.js
