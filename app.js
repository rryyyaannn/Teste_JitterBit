const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")
const express = require("express")
const app = express()

require("./db/banco")

const pedidoRotas = require("./rotas/orderRotas")
const authRotas = require("./rotas/authRotas")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'API de Pedidos',
    swaggerOptions: {
        docExpansion: 'none'
    }
}))
app.use(express.json())
app.use("/",authRotas)
app.use("/",pedidoRotas)
app.listen(3000,()=>{

    console.log("API rodando na porta 3000")
})