const express = require("express")
const router = express.Router()
const {gerarToken} = require("../auth/auth")

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags:
 *       - Auth
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
 *         description: Returns token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
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