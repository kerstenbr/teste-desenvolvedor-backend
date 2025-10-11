# Teste Desenvolvedor Backend

## Rotas:

#### Criar usuário:
Método: POST
```localhost:5555/api/user/user```

Exemplo de body:
```json
{
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
    "address": "R. Cuiabá, 32 - Costa e Silva, Joinville - SC"
}
```

#### Procurar endereço:
Método: GET
```localhost:5555/api/addresses/?address=cuiabá```

#### Editar endereço:
Método: PUT
```localhost:5555/api/addresses/:id```

Exemplo de body:
```json
{
    "address": "R. Cuiabá EDITADO, 32 - Costa e Silva, Joinville - SC"
}
```

#### Deletar endereço:
Método: DELETE
```localhost:5555/api/addresses/:id```

#### Compartilhar endereço:
Método: POST
```localhost:5555/api/addresses/:id/share```

Exemplo de body:
```json
{
    "expiresIn": "3h"
}
```

#### Ver endereço compartilhado:
Método: POST
```localhost:5555/api/addresses/:token```