# API DE GAMES
Esta api foi criada com intuito de simular uma API REST, todo retorno é simulado através de um objeto javascript

##EndPoints

### GET /games
Esse endPoint é responsavel para retornar todos os games cadastrados
#### Parametros
Nenhum
#### Respostas
##### ok! 200

Caso essa resposta ocorra você receberá o retorno dos games

Exemplo de respostas

```
[
    {
        "id": 1,
        "title": "Call of duty",
        "year": 2019,
        "price": 60
    },
    {
        "id": 2,
        "title": "Far Cry 6",
        "year": 2022,
        "price": 120
    },
    {
        "id": 3,
        "title": "Resident evil 5",
        "year": 2012,
        "price": 30
    }
]
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, significa que houve uma falha na autenticação da requisição, Motivo: token inválido, token expirado

Exemplo de respostas
```
{
    "err": "token: inválido"
}
```

### POST /auth
Esse endPoint é responsavel para fazer o processo de login
#### Parametros
E-mail: Email do usuário cadastrado no sistema

Password: Senha do usuário cadastrado no sistema
```
{
    "email": "jaime_andrek@hotmail.com",
    "password": 123
}
```
#### Respostas
##### ok! 200

Caso essa resposta ocorra você receberá o token que será necessario para enviar no momento da requisições em endpoint bloqueados

Exemplo de respostas

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqYWltZV9hbmRyZWtAaG90bWFpbC5jb20iLCJpYXQiOjE2NTM1OTg5OTIsImV4cCI6MTY1Mzc3MTc5Mn0.kIeJwY8JWJskIQFQqs3TPe5wZBR_k-82fYoOQI0qSJQ"
}
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, significa que houve uma falha na autenticação da requisição, Motivo: senha ou email incorreto

Exemplo de respostas
```
{
    "err": "Credenciais inválidas "
}
```
