const express = require("express")
const router = express.Router()
const {gerarToken} = require("../auth/auth")

router.post("/login",(req,res)=>{

    const {usuario,senha} = req.body

    if(usuario === "admin" && senha === "123"){

        const token = gerarToken(usuario)
        return res.json({token})
    }
    res.status(401).json({msg:"login invalido"})
})

module.exports = router