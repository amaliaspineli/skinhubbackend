# Node 20 oficial
FROM node:20

# Criar diretório
WORKDIR /app

# Copiar pacotes
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar resto do projeto
COPY . .

# Cloud Run usa a porta 8080
ENV PORT=8080
EXPOSE 8080

# Comando para rodar
CMD ["node", "index.js"]
