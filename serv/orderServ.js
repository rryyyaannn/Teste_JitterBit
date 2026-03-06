const repo = require("../repo/orderRepo")

async function criarPedido(dados){

    const pedido = {

        orderId: dados.numeroPedido.split("-")[0],
        value: dados.valorTotal,
        creationDate: new Date(dados.dataCriacao).toISOString(),
        items: dados.items.map(i => ({
            productId: parseInt(i.idItem),
            quantity: i.quantidadeItem,
            price: i.valorItem

        }))
    }
    await repo.salvarPedido(pedido)
    return pedido
}

async function obterPedido(id){

    return await repo.buscarPedido(id)
}

async function listarPedidos(){

    return await repo.listarPedidos()
}

async function deletarPedido(id){

    await repo.deletarPedido(id)
}

async function atualizarPedido(id,dados){

    const pedido = {

        value: dados.valorTotal,
        creationDate: new Date(dados.dataCriacao).toISOString(),
        items: dados.items.map(i => ({

            productId: parseInt(i.idItem),
            quantity: i.quantidadeItem,
            price: i.valorItem
        }))
    }
    await repo.atualizarPedido(id,pedido)
}

module.exports = {
    criarPedido,
    obterPedido,
    listarPedidos,
    deletarPedido,
    atualizarPedido
}