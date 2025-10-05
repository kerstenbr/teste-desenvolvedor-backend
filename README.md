# Teste Desenvolvedor Backend

## Rotas:

#### Criar usuário:
```localhost:5555/api/user/user```

Exemplo de body:
```json
{
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "123"
}
```

Resposta sucesso:
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGUyYWNjYWU1NDNiZTBlYTk0ZmFmYjEiLCJpYXQiOjE3NTk2ODU4MzQsImV4cCI6MTc1OTk0NTAzNH0.1PgrC58-1Y1prCkfYOd3xxgbaGkfXp9mG_J-AFnUdcE"
}
```

Resposta erro:
```json
{
    "success": false,
    "message": "error message"
}
```
