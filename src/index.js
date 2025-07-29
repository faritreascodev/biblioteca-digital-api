const app = require("./app")
const mongoose = require("mongoose")
const seedDatabase = require("./seed/seed")
require("dotenv").config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/biblioteca_digital"

async function startServer() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("Conectado a MongoDB")

    // Verificar si la base de datos está vacía y poblarla automáticamente
    const Autor = require("./models/autor.model")
    const count = await Autor.countDocuments()

    if (count === 0) {
      console.log("Base de datos vacía, poblando automáticamente...")
      await seedDatabase()
      console.log("Base de datos poblada automáticamente")
    } else {
      console.log(`Base de datos ya contiene ${count} autores`)
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`)
      console.log(`Docs: http://localhost:${PORT}/api-docs`)
      console.log(`API: http://localhost:${PORT}/api`)
      console.log(`Libros: http://localhost:${PORT}/api/libros`)
    })
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

startServer()