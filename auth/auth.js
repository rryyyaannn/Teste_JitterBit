const jwt = require("jsonwebtoken")
const segredo = "segredo_super_simples"

function gerarToken(usuario){

    return jwt.sign(
        { user: usuario },
        segredo,
        { expiresIn: "1h" }
    )
}

function verificarToken(req,res,next){

    const authHeader = req.headers["authorization"]

    if(!authHeader)
        return res.status(401).json({msg:"token nao enviado"})
    const token = authHeader.split(" ")[1]

    jwt.verify(token,segredo,(err,decoded)=>{

        if(err)
            return res.status(403).json({msg:"token inválido"})
        req.usuario = decoded

        next()
    })
}

module.exports = {
    gerarToken,
    verificarToken
}