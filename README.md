# cadastro-empresas
Um repo sobre cadastro de empresas através de usuários autenticados.
Testado no Ubuntu 20.04.

## Dependências do projeto
- Docker versão 20.10.8 ou superior
- docker-compose version 1.29.2 ou superior.

## Começando com a API
- Baixe os arquivos do repositório via ```git clone```
- Acesse a pasta raiz do projeto
- Copie e cole o `.env.example` na mesma pasta que o original e mude a cópia de nome para `.env`
- Registre os seguintes campos:

| Campo dedicado ao JWT | Descrição | Valor default |
| -------- | -------- | -------- |
| `SECRET` | chave secreta do JWT | - |

| Campo do connect do database | Descrição | Valor default |
| -------- | -------- | -------- |
| `DB_USER` | usuário do database     | -     |
| `DB_PASSWORD` | senha do usuário do database | - |
| `DB_HOST` | host do database | mysqldb |
| `DB_NAME` | nome do database | - |

| Campo da construção da imagem MySQL | Descrição | Valor default |
| -------- | -------- | -------- |
| `MYSQL_ROOT_PASSWORD` | senha do usuário root do MySQL | -     |
| `MYSQL_DATABASE` | nome do database do MySQL | mesmo valor colocado em `DB_NAME` |
| `MYSQL_USER` | nome do usuário do MySQL | mesmo valor colocado em `DB_USER` |
| `MYSQL_PASSWORD` | senha do usuário do MySQL | mesmo valor colocado em `DB_PASSWORD` |
- Em um terminal da sua escolha, digite ```docker-compose build```
e espere o projeto ser buildado;
- Ao fim do processo, digite ```docker-compose up``` para rodar a aplicação.

## Funcionamento básico da API
A API cadastro-empresa é uma API RESTful que tem como intuito principal buscar CNPJs em outra API, a BrasilAPI, e cadastrar as empresas
encontradas pelo CNPJ no seu próprio banco de dados. Para isso, inicialmente a API precisa se cadastrar um usuário usando nome, email e senha,
autenticá-lo no sistema, e e então receber um CNPJ para busca e inserção no banco de dados. É possível também editar as informações da empresa inserindo apenas o CNPJ (a aplicação busca os dados a serem editados na BrasilAPI)
e excluí-la usando seu CNPJ.

## Endpoints da API

### Endpoints de autenticação:

#### **`POST /login`:** esse endpoint permite o login no sistema.

##### body

~~~json
{
    "email": "email@gmail.com",
    "password": "password"
}
~~~

- Status 200
~~~json
{
    "token": "token"
}
~~~

- Status 400
~~~json
{
    "message": "Error on getting email or password",
    "error": "Request: bad format" 
}
~~~

- Status 403
~~~json
{
    "message": "Error on authentication",
    "error": "Incorrect email or password"
}
~~~

- Status 500
~~~json
{
    "message": "Error on checking",
    "error": "Error description." 
}
~~~

### Endpoints de usuários:

#### **`GET /users`:** esse endpoint lista usuários do sistema.

##### Headers
```
    x-access-token: token
```
- Status 200
~~~json
{
    "message": "Found",
    "rows": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "email@gmail.com",
            "password": "$2a$10$mVvmrfisLMHpMGa7gja7KODO9du7PeBIIu/MKBDb0OPsFYa1eB5F6"
        }
    ] 
}
~~~
- Status 401
~~~json
{
    "message": "Error on verifying user",
    "error": "No token provided"
}
~~~
- Status 403
~~~json
{
    "message": "Error on verifying user",
    "error": "Forbidden"
}
~~~
- Status 404
~~~json
{
    "message": "Not found",
    "error": "Users not found"
}
~~~
- Status 500
~~~json
{
    "message": "Error on getting users",
    "error": "Error description."
}
~~~

#### **`POST /users`:** esse endpoint insere um usuário no sistema.

##### body

~~~json
{
    "name": "John Doe",
    "email": "email@gmail.com",
    "password": "password"
}
~~~
- Status 201
~~~json
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
~~~
- Status 400
~~~json
{
    "message": "Error on creation",
    "error": "Please enter a valid email"
}
~~~
or 
~~~json
{
    "message": "Error on getting password",
    "error": "Request: bad format"            
}
~~~
- Status 500
~~~json
{
    "message": "Error on creation",
    "error": "Error description."
}
~~~
or
~~~json
{
    "message": "Error on hashing",
    "error": "Error description"            
}
~~~

### Endpoints de empresas

#### **`GET /companies`:** esse endpoint lista empresas do sistema.

##### Headers
```
    x-access-token: token
```

- Status 200
~~~json
{
  "message": "Found",
  "rows": [
    {
        "id": 1,
        "cnpj": "33014556000196",
        "corporate_name": "LOJAS AMERICANAS S.A.",
        "trading_name": "",
        "city": "RIO DE JANEIRO",
        "state": "RJ"
    }
  ]
}
~~~

- Status 404
~~~json
{
    "message": "Not found",
    "error": "Companies not found"
}
~~~
- Status 401
~~~json
{
    "message": "Error on verifying user",
    "error": "No token provided"
}
~~~
- Status 403
~~~json
{
    "message": "Error on verifying user",
    "error": "Forbidden"
}
~~~
- Status 500
~~~json
{
    "message": "Error on getting companies",
    "error": "Error description."
}
~~~

#### **`POST /companies`:** esse endpoint cria empresas no sistema.

##### Body
~~~json
{
    "cnpj": "33.014.556/0001-96"
}
~~~
##### Headers
```
    x-access-token: token
```
- Status 201
~~~json
{
  "message": "Created",
  "rows": [
    {
        "id": 1,
        "cnpj": "33014556000196",
        "corporate_name": "LOJAS AMERICANAS S.A.",
        "trading_name": "",
        "city": "RIO DE JANEIRO",
        "state": "RJ"
    }
  ]
}
~~~
- Status 400
~~~json
{
    "message": "Error on creating company",
    "error": "No such company registered in BrasilAPI"
}
~~~
or 
~~~json
{
    "message": "Error on creating company",
    "error": "No CNPJ in request"
}
~~~
- Status 401
~~~json
{
    "message": "Error on verifying user",
    "error": "No token provided"
}
~~~
- Status 403
~~~json
{
    "message": "Error on verifying user",
    "error": "Forbidden"
}
~~~
- Status 500
~~~json
{
    "message": "Error on creation",
    "error": "Error description."
}
~~~
#### **`PUT /companies/:cnpj`:** esse endpoint edita empresas no sistema, baseado nos dados da BrasilAPI.

##### Params
```
    cnpj: "33.014.556/0001-96"
```
##### Headers
```
    x-access-token: token
```
- Status 201
~~~json
{
    "message": "Updated",
    "rows": [
    {
        "id": 1,
        "cnpj": "33014556000196",
        "corporate_name": "LOJAS AMERICANAS S.A.",
        "trading_name": "",
        "city": "RIO DE JANEIRO",
        "state": "RJ"
    }
  ]
}
~~~
- Status 400
~~~json
{
    "message": "Error on editing company",
    "error": "No such company registered in BrasilAPI"
}
~~~
or 
~~~json
{
    "message": "Error on editing company",
    "error": "No CNPJ in request"
}
~~~
- Status 401
~~~json
{
    "message": "Error on verifying user",
    "error": "No token provided"
}
~~~
- Status 403
~~~json
{
    "message": "Error on verifying user",
    "error": "Forbidden"
}
~~~
- Status 500
~~~json
{
    "message": "Error on editing",
    "error": "Error description."
}
~~~
#### **`DELETE /companies/:cnpj`:** esse endpoint deleta empresas do sistema.

##### Params
```
    cnpj: "33.014.556/0001-96"
```
##### Headers
```
    x-access-token: token
```
- Status 204

- Status 400
~~~json
{
    "message": "Error on deleting company",
    "error": "No CNPJ in request"
}
~~~
- Status 401
~~~json
{
    "message": "Error on verifying user",
    "error": "No token provided"
}
~~~
- Status 403
~~~json
{
    "message": "Error on verifying user",
    "error": "Forbidden"
}
~~~
- Status 404
~~~json
{
    "message": "Not found",
    "error": "Companies not found"
}
~~~
- Status 500
~~~json
{
    "message": "Error on editing",
    "error": "Error description."
}
~~~