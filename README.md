# cadastro-empresas
Um repo sobre cadastro de empresas através de usuários autenticados.

## Dependências do projeto
- Docker versão 20.10.8 ou superior
- docker-compose version 1.29.2 ou superior.

## Comceçando com a API
- Baixe os arquivos do repositório via ```git clone```
- Acesse a pasta raiz do projeto
- Copie e cole o `.env.example` na mesma pasta que o original e mude a cópia de nome para `.env`
- Registre uma chave secreta no campo `SECRET` no `.env`
- Registre o usuário do database no campo `DB_USER`, a senha do usuário no campo `DB_PASSWORD`, o nome do host do usuário no campo `DB_HOST` e
o nome do database no campo `DB_NAME`
- Registre a senha do usuário root do database no campo `MYSQL_ROOT_PASSWORD`, o nome do database no campo `MYSQL_DATABASE` (mesmo valor colocado em `DB_NAME`), o nome do usuário no
campo `MYSQL_USER` (mesmo valor colocado em `DB_USER`) e a senha do usuário no campo `MYSQL_PASSWORD` (mesmo valor colocado em `DB_PASSWORD`)
- Em um terminal da sua escolha, digite ```docker-compose build```
e espere o projeto ser buildado;
- Ao fim do processo, digite ```docker-compose up``` para rodar a aplicação.

## Funcionamento básico da API
A API cadastro-empresa é uma API RESTful que tem como intuito principal buscar CNPJs em outra API, a BrasilAPI, e cadastrar as empresas
encontradas pelo CNPJ no seu próprio banco de dados. Para isso, inicialmente a API precisa se cadastrar um usuário usando nome, email e senha,
autenticá-lo no sistema, e e então receber um CNPJ para busca e inserção no banco de dados. É possível também editar as informações da empresa
e excluí-la usando seu CNPJ.

## Endpoints da API
POST /users: esse endpoint insere um usuário no sistema.
- body
```
{
	"name": "John Doe",
	"email": "email@gmail.com",
	"password": "password"
}
```
- Status 201
```
{
  "message": "Created",
  "rows": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "email@gmail.com",
      "password": "$2a$10$mVvmrfisLMHpMGa7gja7KODO9du7PeBIIu/MKBDb0OPsFYa1eB5F6"
    }
  ]
}
```

