const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Biblioteca Digital",
      version: "1.0.0",
      description: "API básica para gestión de biblioteca",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Autor: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nombre: { type: "string" },
            apellido: { type: "string" },
            nacionalidad: { type: "string" },
          },
        },
        Categoria: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nombre: { type: "string" },
            descripcion: { type: "string" },
          },
        },
        Libro: {
          type: "object",
          properties: {
            _id: { type: "string" },
            titulo: { type: "string" },
            autores: { type: "array", items: { type: "string" } },
            categorias: { type: "array", items: { type: "string" } },
            isbn: { type: "string" },
            fechaPublicacion: { type: "string", format: "date" },
            disponible: { type: "boolean" },
          },
        },
        Prestamo: {
          type: "object",
          properties: {
            _id: { type: "string" },
            libro: { type: "string" },
            usuario: { type: "string" },
            fechaPrestamo: { type: "string", format: "date" },
            fechaDevolucion: { type: "string", format: "date" },
            devuelto: { type: "boolean" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
}

module.exports = swaggerJsdoc(options)
