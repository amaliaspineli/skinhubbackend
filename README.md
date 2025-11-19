# SkinHub – Backend (Node.js) – README

Backend responsável por fornecer a API do projeto SkinHub, executado dentro do ambiente do Firebase Functions com Node.js 20.

## Instalação do Node usando NVM
### Instalar o NVM (Windows)

Baixe o instalador oficial:
https://github.com/coreybutler/nvm-windows/releases

### Verificar instalação
```bash
nvm version
```

### Instalar a versão usada no projeto
```bash
nvm install 20
nvm use 20
```

### Confirmar
```bash
node -v      # deve mostrar v20.x
npm -v
```

## Instalar dependências do backend
Entre na pasta functions:
```bash
cd functions
npm install
```

Isso instala:
- firebase-functions
- firebase-admin
- express
- Outras dependências necessárias para SSR

## Estrutura do backend
```bash
functions/
│
├── index.js              # Código principal
├── package.json          # Configuração e dependências
└── node_modules/         # Pacotes instalados
```

O arquivo index.js exporta:
- Uma função HTTPS que executa o SSR
- Integração com Express para servir o Angular renderizado no servidor

## Rodando localmente
Usando Firebase emuladores:
```bash
firebase emulators:start
```

Isso ativa:
- Funções (API)
- SSR
- Hosting

Tudo rodando junto.

## Tecnologias utilizadas
- Node.js 20
- Firebase Functions v2
- Firebase Admin SDK
- Express 4
- CommonJS para garantir compatibilidade no runtime

## Decisões técnicas
- Node.js 20 → requerido pelo Firebase Functions v2
- Express 4 → compatível com SSR do Angular
- SSR rodando dentro de uma Function → possibilita rotas dinâmicas e SEO
- CommonJS no backend → inicialização mais rápida e menor risco de timeout