# Teste Desenvolvedor Backend

## Rotas:

#### Criar usuário:
Método: POST
```localhost:5555/api/user/user```

Exemplo de body:
```json
{
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "123"
}
```

#### Login:
Método: POST
```localhost:5555/api/user/login```

Exemplo de body:
```json
{
    "email": "admin@gmail.com",
    "password": "123"
}
```
#### Criar endereço:
Método: POST
```localhost:5555/api/addresses/```

Exemplo de body:
```json
{
    "street": "R. Cuiabá, 32 - Costa e Silva, Joinville - SC"
}