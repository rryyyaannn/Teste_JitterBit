const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./pedidos.db")

db.serialize(() => {
    db.run(`
        create table if not exists OrderTbl (
        orderId TEXT PRIMARY KEY,
        value REAL,
        creationDate TEXT)
        `)
    db.run(`
        create table if not exists Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId TEXT,
        productId INTEGER,
        quantity INTEGER,
        price REAL)
    `)
})

module.exports = db