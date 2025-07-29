const Libro = require("../models/libro.model")

exports.obtenerLibros = async (req, res) => {
    try {
        const { autor, categoria, disponible } = req.query
        const filtros = {}

        if (autor) filtros.autores = autor
        if (categoria) filtros.categorias = categoria
        if (disponible !== undefined) filtros.disponible = disponible === "true"

        const libros = await Libro.find(filtros).populate("autores").populate("categorias")
        res.json(libros)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.obtenerLibroPorId = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id).populate("autores").populate("categorias")
        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado" })
        }
        res.json(libro)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.buscarLibros = async (req, res) => {
    try {
        const { q } = req.query
        if (!q) {
            return res.status(400).json({ error: "Parámetro de búsqueda requerido" })
        }

        const libros = await Libro.find({
            titulo: { $regex: q, $options: "i" },
        }).populate("autores")

        res.json(libros)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.crearLibro = async (req, res) => {
    try {
        const libro = new Libro(req.body)
        await libro.save()
        await libro.populate("autores categorias")
        res.status(201).json(libro)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.actualizarLibro = async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("autores categorias")
        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado" })
        }
        res.json(libro)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.eliminarLibro = async (req, res) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id)
        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado" })
        }
        res.json({ message: "Libro eliminado" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
