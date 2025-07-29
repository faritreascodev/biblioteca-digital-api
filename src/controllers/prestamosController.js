const Prestamo = require("../models/prestamo.model")
const Libro = require("../models/libro.model")

exports.obtenerPrestamos = async (req, res) => {
    try {
        const { usuario, devuelto } = req.query
        const filtros = {}

        if (usuario) filtros.usuario = { $regex: usuario, $options: "i" }
        if (devuelto !== undefined) filtros.devuelto = devuelto === "true"

        const prestamos = await Prestamo.find(filtros).populate("libro")
        res.json(prestamos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.obtenerPrestamoPorId = async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id).populate("libro")
        if (!prestamo) {
            return res.status(404).json({ error: "Préstamo no encontrado" })
        }
        res.json(prestamo)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.obtenerHistorialUsuario = async (req, res) => {
    try {
        const { usuario } = req.params
        const prestamos = await Prestamo.find({ usuario }).populate("libro")
        res.json({ usuario, prestamos })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.crearPrestamo = async (req, res) => {
    try {
        const libro = await Libro.findById(req.body.libro)
        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado" })
        }
        if (!libro.disponible) {
            return res.status(400).json({ error: "Libro no disponible" })
        }

        const prestamo = new Prestamo(req.body)
        await prestamo.save()

        await Libro.findByIdAndUpdate(req.body.libro, { disponible: false })
        await prestamo.populate("libro")

        res.status(201).json(prestamo)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.devolverLibro = async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id)
        if (!prestamo) {
            return res.status(404).json({ error: "Préstamo no encontrado" })
        }
        if (prestamo.devuelto) {
            return res.status(400).json({ error: "Libro ya devuelto" })
        }

        prestamo.devuelto = true
        prestamo.fechaDevolucion = new Date()
        await prestamo.save()

        await Libro.findByIdAndUpdate(prestamo.libro, { disponible: true })
        await prestamo.populate("libro")

        res.json(prestamo)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.eliminarPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findByIdAndDelete(req.params.id)
        if (!prestamo) {
            return res.status(404).json({ error: "Préstamo no encontrado" })
        }

        if (!prestamo.devuelto) {
            await Libro.findByIdAndUpdate(prestamo.libro, { disponible: true })
        }

        res.json({ message: "Préstamo eliminado" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
