const Autor = require("../models/autor.model")

exports.obtenerAutores = async (req, res) => {
    try {
        const autores = await Autor.find()
        res.json(autores)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.obtenerAutorPorId = async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id)
        if (!autor) {
            return res.status(404).json({ error: "Autor no encontrado" })
        }
        res.json(autor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.crearAutor = async (req, res) => {
    try {
        const autor = new Autor(req.body)
        await autor.save()
        res.status(201).json(autor)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.actualizarAutor = async (req, res) => {
    try {
        const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!autor) {
            return res.status(404).json({ error: "Autor no encontrado" })
        }
        res.json(autor)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.eliminarAutor = async (req, res) => {
    try {
        const autor = await Autor.findByIdAndDelete(req.params.id)
        if (!autor) {
            return res.status(404).json({ error: "Autor no encontrado" })
        }
        res.json({ message: "Autor eliminado" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
