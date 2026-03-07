# API simples de gerenciamento de pedidos

Descrição
- API minimalista para criar, listar, atualizar e remover pedidos (Express + SQLite).

Tecnologias
- Node.js
- Express
- SQLite (arquivo: `pedidos.db`)

Como rodar
```bash
npm install
npm run dev # usa nodemon (script `dev`)
# ou iniciar diretamente
node app.js
```

Variáveis de ambiente recomendadas
- `JWT_SECRET` — segredo para assinar tokens JWT (em produção, defina esta variável; o código atual usa `segredo_super_simples` como padrão).

Documentação (Swagger)
- Acesse a documentação em: `http://localhost:3000/docs`
- Para testar endpoints protegidos:
	1. Obtenha um token com `POST /login` (body JSON: `{ "usuario":"admin","senha":"123" }`).
	2. No Swagger UI clique em "Authorize" e cole: `Bearer <seu_token>`.

Endpoints
- POST /order
	- Cria um pedido. Body JSON esperado (exemplo):
		```json
		{
			"numeroPedido": "v10089015vdb-01",
			"valorTotal": 10000,
			"dataCriacao": "2023-07-19T12:24:11.529Z",
			"items": [
				{ "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 }
			]
		}
		```
- GET /order/list
	- Lista todos os pedidos.
- GET /order/:id
	- Retorna o pedido identificado por `orderId`.
- PUT /order/:id
	- Atualiza o pedido (mesmo formato do POST, não é necessário enviar `numeroPedido`).
- DELETE /order/:id
	- Remove o pedido e os itens associados.
