# Teste Desenvolvedor Backend

Para rodar essa API:

1: Clone o repositório
```git clone https://github.com/kerstenbr/teste-desenvolvedor-backend.git``` 

2: Entre na pasta
```cd teste-desenvolvedor-backend```

3: Inicie o docker
```docker compose up --build```

## Rotas:

Se você estiver usando o Postman para fazer o teste da API, pode importar as rotas usando o json:
```Teste Desenvolvedor Backend.postman_collection.json``` que está na raiz do projeto.

Nas requisições para o ```addresses```, exceto ```localhost:5555/api/addresses/:token```, é necessário adicionar o token do usuário ao header da chamada, e o Auth Type tem que ser Bearer.
![Print da tela do postman](https://i.imgur.com/0y2cbEm.png)

Caso não esteja usando o Postman, o token tem que ser enviado dessa maneira: ```Bearer seuToken``` no request.headers.

#### - Criar usuário:
Método: POST
```localhost:5555/api/user/user```

Exemplo de body:
```json
{
    "email": "admin@gmail.com",
    "password": "123"
}
```

#### - Login:
Método: POST
```localhost:5555/api/user/login```

Exemplo de body:
```json
{
    "email": "admin@gmail.com",
    "password": "123"
}
```
#### - Criar endereço:
Método: POST
```localhost:5555/api/addresses/```

Exemplo de body:
```json
{
    "address": "R. Cuiabá, 32 - Costa e Silva, Joinville - SC"
}
```

#### - Procurar endereço:
Método: GET
```localhost:5555/api/addresses/?address=cuiabá```

#### - Editar endereço:
Método: PUT
```localhost:5555/api/addresses/:id```

Exemplo de body:
```json
{
    "address": "R. Cuiabá EDITADO, 32 - Costa e Silva, Joinville - SC"
}
```

#### - Deletar endereço:
Método: DELETE
```localhost:5555/api/addresses/:id```

#### - Compartilhar endereço:
Método: POST
```localhost:5555/api/addresses/:id/share```

Exemplo de body:
```json
{
    "expiresIn": "3h"
}
```

#### - Ver endereço compartilhado:
Método: POST
```localhost:5555/api/addresses/:token```

## Testes:

Dentro da pasta raiz do projeto rode o comando: ```npm run test```