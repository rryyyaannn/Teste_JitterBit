const express = require("express")
const router = express.Router()

const serv = require("../serv/orderServ")

router.post("/order", async (req,res)=>{

    try{

        const pedido = await serv.criarPedido(req.body)
        res.status(201).json(pedido)

    }catch(e){
        res.status(500).json({erro:"erro ao criar pedido"})
    }
})

router.get("/order/list", async (req,res)=>{

    const lista = await serv.listarPedidos()
    res.json(lista)

})

router.get("/order/:id", async (req,res)=>{

    try{

        const ped = await serv.obterPedido(req.params.id)

        if(!ped)
            return res.status(404).json({msg:"pedido nao encontrado"})
        res.json(ped)

    }catch(e){
        res.status(500).json({erro:"erro ao buscar pedido"})
    }
})

router.delete("/order/:id", async (req,res)=>{

    await serv.deletarPedido(req.params.id)
    res.json({msg:"pedido removido"})

})

router.put("/order/:id", async (req,res)=>{

    await serv.atualizarPedido(req.params.id,req.body)
    res.json({msg:"pedido atualizado"})

})

module.exports = router