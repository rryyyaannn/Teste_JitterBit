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

Exemplos rápidos (`curl`)
```bash
# Obter token
curl --location 'http://localhost:3000/login' \
	-H 'Content-Type: application/json' \
	--data '{"usuario":"admin","senha":"123"}'

# Criar pedido (substitua <token>)
curl --location 'http://localhost:3000/order' \
	-H 'Content-Type: application/json' \
	-H 'Authorization: Bearer <token>' \
	--data '{"numeroPedido":"v20000001-01","valorTotal":5000,"dataCriacao":"2024-01-01T10:00:00Z","items":[{"idItem":"1111","quantidadeItem":2,"valorItem":2500}]}'

# Listar pedidos
curl -H 'Authorization: Bearer <token>' http://localhost:3000/order/list

# Obter pedido
curl -H 'Authorization: Bearer <token>' http://localhost:3000/order/v20000001

# Atualizar pedido
curl -X PUT -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' \
	-d '{"valorTotal":6000,"dataCriacao":"2024-02-01T12:00:00Z","items":[{"idItem":"2222","quantidadeItem":3,"valorItem":2000}]}' \
	http://localhost:3000/order/v20000001

# Deletar pedido
curl -X DELETE -H 'Authorization: Bearer <token>' http://localhost:3000/order/v20000001
```

Observações importantes
- O arquivo do banco é `pedidos.db` e é criado automaticamente pelo projeto.
- Atualmente o `orderId` salvo é gerado em `serv/orderServ.js` como `dados.numeroPedido.split("-")[0]`. Isso pode causar conflito de chave primária quando o mesmo prefixo for reutilizado (ex.: `v10089015vdb-01` e `v10089015vdb-02`). Para evitar conflitos, você pode:
	- Usar `numeroPedido` completo como `orderId` em `serv/orderServ.js`, ou
	- Alterar o esquema do banco para PK autoincrement e tornar `orderId` `UNIQUE`.
- O segredo JWT está embutido no código; mova para `process.env.JWT_SECRET` em produção.

Se quiser, atualizo o `README` com instruções de deploy ou adiciono exemplos de resposta JSON.