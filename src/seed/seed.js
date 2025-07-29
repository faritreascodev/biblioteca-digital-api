const mongoose = require("mongoose")
const Autor = require("../models/autor.model")
const Categoria = require("../models/categoria.model")
const Libro = require("../models/libro.model")
const Prestamo = require("../models/prestamo.model")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/biblioteca_digital"

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Conectado a MongoDB")

    // Limpiar colecciones
    await Promise.all([Autor.deleteMany({}), Categoria.deleteMany({}), Libro.deleteMany({}), Prestamo.deleteMany({})])
    console.log("Colecciones limpiadas")

    // Crear autores
    const autores = await Autor.insertMany([
      { nombre: "Gabriel", apellido: "García Márquez", nacionalidad: "Colombiana" },
      { nombre: "Isabel", apellido: "Allende", nacionalidad: "Chilena" },
      { nombre: "Mario", apellido: "Vargas Llosa", nacionalidad: "Peruana" },
      { nombre: "Jorge Luis", apellido: "Borges", nacionalidad: "Argentina" },
      { nombre: "Octavio", apellido: "Paz", nacionalidad: "Mexicana" },
    ])
    console.log(`${autores.length} autores creados`)

    // Crear categorías
    const categorias = await Categoria.insertMany([
      { nombre: "Realismo Mágico", descripcion: "Género que combina realidad y fantasía" },
      { nombre: "Novela", descripcion: "Narrativa extensa de ficción" },
      { nombre: "Ensayo", descripcion: "Texto reflexivo sobre diversos temas" },
      { nombre: "Poesía", descripcion: "Expresión artística en verso" },
      { nombre: "Cuento", descripcion: "Narrativa breve de ficción" },
    ])
    console.log(`${categorias.length} categorías creadas`)

    // Crear libros
    const libros = await Libro.insertMany([
      {
        titulo: "Cien años de soledad",
        autores: [autores[0]._id],
        categorias: [categorias[0]._id],
        isbn: "978-84-376-0494-7",
        fechaPublicacion: new Date("1967-05-30"),
      },
      {
        titulo: "La casa de los espíritus",
        autores: [autores[1]._id],
        categorias: [categorias[0]._id, categorias[1]._id],
        isbn: "978-84-204-2676-7",
        fechaPublicacion: new Date("1982-10-01"),
      },
      {
        titulo: "La ciudad y los perros",
        autores: [autores[2]._id],
        categorias: [categorias[1]._id],
        isbn: "978-84-322-0842-4",
        fechaPublicacion: new Date("1963-10-01"),
      },
      {
        titulo: "Ficciones",
        autores: [autores[3]._id],
        categorias: [categorias[4]._id],
        isbn: "978-84-204-0086-6",
        fechaPublicacion: new Date("1944-01-01"),
      },
      {
        titulo: "El laberinto de la soledad",
        autores: [autores[4]._id],
        categorias: [categorias[2]._id],
        isbn: "978-968-16-0213-9",
        fechaPublicacion: new Date("1950-01-01"),
      },
    ])
    console.log(`${libros.length} libros creados`)

    // Crear préstamos
    const prestamos = await Prestamo.insertMany([
      {
        libro: libros[0]._id,
        usuario: "Juan Pérez",
        fechaPrestamo: new Date("2024-01-15"),
        fechaDevolucion: new Date("2024-01-30"),
        devuelto: true,
      },
      {
        libro: libros[1]._id,
        usuario: "María González",
        fechaPrestamo: new Date("2024-02-01"),
        devuelto: false,
      },
      {
        libro: libros[2]._id,
        usuario: "Carlos Rodríguez",
        fechaPrestamo: new Date("2024-02-10"),
        devuelto: false,
      },
    ])
    console.log(`${prestamos.length} préstamos creados`)

    // Actualizar disponibilidad
    for (const prestamo of prestamos) {
      if (!prestamo.devuelto) {
        await Libro.findByIdAndUpdate(prestamo.libro, { disponible: false })
      }
    }

    console.log("Base de datos poblada exitosamente")
  } catch (error) {
    console.error("Error:", error)
  } finally {
    await mongoose.connection.close()
  }
}

if (require.main === module) {
  seedDatabase()
}

module.exports = seedDatabase
