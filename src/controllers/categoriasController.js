const Categoria = require("../models/categoria.model")

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find()
        res.json(categorias)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id)
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" })
        }
        res.json(categoria)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.crearCategoria = async (req, res) => {
    try {
        const categoria = new Categoria(req.body)
        await categoria.save()
        res.status(201).json(categoria)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.actualizarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" })
        }
        res.json(categoria)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.eliminarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id)
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" })
        }
        res.json({ message: "Categoría eliminada" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
