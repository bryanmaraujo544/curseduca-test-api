# curseduca-test-api

## Como rodar o projeto na sua máquina

- O primeiro passo para rodar o servidor é criar o banco de dados MySQL para que o Prisma ORM consiga mapear as tabelas
```
  CREATE DATABASE curseduca_test;
```

- Clone o repositório em sua máquina utilizando e em seguida entre na pasta do app e abra-a num editor de código de sua preferência
```
  git clone https://github.com/bryanmaraujo544/curseduca-test-api.git
  cd curseduca-test-api
  code .
```

- Na pasta do projeto executes os seguintes comandospara instalar as dependências
```
  yarn
  OU
  npm install
```

- Crie um arquivo .env na raíz do projeto, contendo
```
  DATABASE_URL="mysql://USER:PASSWORD@localhost:PORT/curseduca_test?schema=public"
  SECRET_KEY="ec37aa25501f5aea74d5eb3d19b08333"
```
em DATABASE_URL substitua:
- USER: nome de usuários
- PASSWORD: senha
- PORT: porta em que seu banco de dados está rodando
- exemplo: DATABASE_URL="mysql://root:root@localhost:3306/curseduca_test?schema=public"

- Agora execute o comando para contruir o banco baseado no nosso schema do Prisma 
```
  yarn migrate
```

- Agora execute:
```
 yarn dev
```

### Pronto, o servidor está rodando em localhost:8080!
