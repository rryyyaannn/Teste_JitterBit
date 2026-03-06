const express = require("express")
const app = express()

require("./db/banco")

const orderRotas = require("./rotas/orderRotas")

app.use(express.json())
app.use("/",orderRotas)
app.listen(3000,()=>{
console.log("api rodando na porta 3000")
})