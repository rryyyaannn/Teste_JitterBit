const express = require("express")
const router = express.Router()
const {gerarToken} = require("../auth/auth")

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Fazer login e receber token JWT
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login",(req,res)=>{

    const {usuario,senha} = req.body

    if(usuario === "admin" && senha === "123"){

        const token = gerarToken(usuario)
        return res.json({token})
    }
    res.status(401).json({msg:"login invalido"})
})

module.exports = router