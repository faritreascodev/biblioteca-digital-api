const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")

const autoresRoutes = require("./routes/autoresRoutes")
const categoriasRoutes = require("./routes/categoriasRoutes")
const librosRoutes = require("./routes/librosRoutes")
const prestamosRoutes = require("./routes/prestamosRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
  res.json({
    message: "API Biblioteca Digital",
    endpoints: {
      autores: "/api/autores",
      categorias: "/api/categorias",
      libros: "/api/libros",
      prestamos: "/api/prestamos",
    },
    docs: "/api-docs",
  })
})

app.use("/api/autores", autoresRoutes)
app.use("/api/categorias", categoriasRoutes)
app.use("/api/libros", librosRoutes)
app.use("/api/prestamos", prestamosRoutes)

app.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" })
})

module.exports = app