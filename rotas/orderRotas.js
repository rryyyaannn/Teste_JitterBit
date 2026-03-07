const express = require("express")
const router = express.Router()

const serv = require("../serv/orderServ")
const {verificarToken} = require("../auth/auth")

/**
 * @openapi
 * /order:
 *   post:
 *     summary: Criar novo pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *               valorTotal:
 *                 type: number
 *               dataCriacao:
 *                 type: string
 *                 format: date-time
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                     quantidadeItem:
 *                       type: integer
 *                     valorItem:
 *                       type: number
 *     responses:
 *       201:
 *         description: Criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       500:
 *         description: Erro no servidor
 */
router.post("/order", verificarToken, async (req,res)=>{

    try{

        const pedido = await serv.criarPedido(req.body)
        res.status(201).json(pedido)

    }catch(e){
        res.status(500).json({erro:"erro ao criar pedido"})
    }
})

/**
 * @openapi
 * /order/list:
 *   get:
 *     summary: Listar pedidos
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get("/order/list", verificarToken, async (req,res)=>{

    const lista = await serv.listarPedidos()
    res.json(lista)

})

/**
 * @openapi
 * /order/{id}:
 *   get:
 *     summary: Obter pedido por id
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Objeto de pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Não encontrado
 */
router.get("/order/:id", verificarToken, async (req,res)=>{

    try{

        const ped = await serv.obterPedido(req.params.id)

        if(!ped)
            return res.status(404).json({msg:"pedido nao encontrado"})
        res.json(ped)

    }catch(e){
        res.status(500).json({erro:"erro ao buscar pedido"})
    }
})

/**
 * @openapi
 * /order/{id}:
 *   delete:
 *     summary: Remover pedido por id
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removido
 */
router.delete("/order/:id", verificarToken, async (req,res)=>{

    await serv.deletarPedido(req.params.id)
    res.json({msg:"pedido removido"})

})

/**
 * @openapi
 * /order/{id}:
 *   put:
 *     summary: Atualizar pedido por id
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *               dataCriacao:
 *                 type: string
 *                 format: date-time
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Atualizado
 */
router.put("/order/:id", verificarToken, async (req,res)=>{

    await serv.atualizarPedido(req.params.id,req.body)
    res.json({msg:"pedido atualizado"})

})

module.exports = router