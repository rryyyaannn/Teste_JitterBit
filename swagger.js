const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order API",
            version: "1.0.0",
            description: "API teste de pedidos"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                Item: {
                    type: "object",
                    properties: {
                        idItem: { type: "string" },
                        quantidadeItem: { type: "integer" },
                        valorItem: { type: "number" }
                    },
                    required: ["idItem","quantidadeItem","valorItem"]
                },
                Order: {
                    type: "object",
                    properties: {
                        orderId: { type: "string" },
                        value: { type: "number" },
                        creationDate: { type: "string", format: "date-time" },
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Item" }
                        }
                    }
                }
            }
        }
    },
    apis: ["./rotas/*.js"]
}

module.exports = swaggerJsdoc(options)