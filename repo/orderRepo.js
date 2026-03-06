const db = require("../db/banco")

function salvarPedido(pedido){
    return new Promise((resolve,reject)=>{

        const sql = `INSERT into OrderTbl (orderId,value,creationDate) VALUES (?,?,?)`

        db.run(sql,[pedido.orderId,pedido.value,pedido.creationDate],err=>{

            if(err) return reject(err)

            for(const it of pedido.items){

                db.run(
                    `insert into Items (orderId,productId,quantity,price) VALUES (?,?,?,?)`,
                    [pedido.orderId,it.productId,it.quantity,it.price]
                )
            }
            resolve()
        })
    })
}

function buscarPedido(id){

    return new Promise((resolve,reject)=>{

        db.get(`Select * FROM orderTbl WHERE orderId=?`,[id],(err,row)=>{
            if(err) return reject(err)
            if(!row) return resolve(null)
            db.all(`Select productId,quantity,price FROM items WHERE orderId=?`,[id],(err,items)=>{

                if(err) return reject(err)

                row.items = items

                resolve(row)

            })

        })

    })

}

function listarPedidos(){

    return new Promise((resolve,reject)=>{
        db.all(`Select * FROM orderTbl`,[],(err,rows)=>{

            if(err) return reject(err)
            resolve(rows)

        })

    })

}

function deletarPedido(id){

    return new Promise((resolve,reject)=>{

        db.run(`Delete FROM items WHERE orderId=?`,[id])
        db.run(`Delete FROM orderTbl WHERE orderId=?`,[id],err=>{

            if(err) return reject(err)
            resolve()
        })
    })
}

function atualizarPedido(id,novo){

    return new Promise((resolve,reject)=>{

        db.run(
            `update orderTbl SET value=?, creationDate=? WHERE orderId=?`,
            [novo.value,novo.creationDate,id],
            err=>{

                if(err) return reject(err)
                db.run(`Delete FROM items WHERE orderId=?`,[id])
                for(const it of novo.items){

                    db.run(
                        `insert into items (orderId,productId,quantity,price) VALUES (?,?,?,?)`,
                        [id,it.productId,it.quantity,it.price]
                    )
                }
                resolve()
            }
        )
    })
}

module.exports = {
    salvarPedido,
    buscarPedido,
    listarPedidos,
    deletarPedido,
    atualizarPedido
}