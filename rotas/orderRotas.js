const express = require("express")
const router = express.Router()

const serv = require("../serv/orderServ")
const {verificarToken} = require("../auth/auth")

/**
 * @openapi
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
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
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
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
 *     summary: List all orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/order/list", verificarToken, async (req,res)=>{

    const lista = await serv.listarPedidos()
    res.json(lista)

})

/**
 * @openapi
 * /order/{id}:
 *   get:
 *     summary: Get order by id
 *     tags:
 *       - Orders
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
 *         description: Order object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Not found
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
 *     summary: Delete order by id
 *     tags:
 *       - Orders
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
 *         description: Removed
 */
router.delete("/order/:id", verificarToken, async (req,res)=>{

    await serv.deletarPedido(req.params.id)
    res.json({msg:"pedido removido"})

})

/**
 * @openapi
 * /order/{id}:
 *   put:
 *     summary: Update order by id
 *     tags:
 *       - Orders
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
 *         description: Updated
 */
router.put("/order/:id", verificarToken, async (req,res)=>{

    await serv.atualizarPedido(req.params.id,req.body)
    res.json({msg:"pedido atualizado"})

})

module.exports = router