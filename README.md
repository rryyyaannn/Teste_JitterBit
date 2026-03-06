# API simples de gerenciamento de pedidos

Tecnologias
- Node.js
- Express
- SQLite

Como rodar

npm install
npm run dev

Endpoints

- POST /order
	- Cria um pedido. Body JSON esperado(exemplo):
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
	- Atualiza o pedido com os dados no body (mesmo formato do POST).
- DELETE /order/:id
	- Remove o pedido e os itens associados.