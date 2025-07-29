const mongoose = require("mongoose")

const libroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true,
        },
        autores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Autor",
                required: true,
            },
        ],
        categorias: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Categoria",
                required: true,
            },
        ],
        isbn: {
            type: String,
            required: true,
            unique: true,
        },
        fechaPublicacion: {
            type: Date,
        },
        disponible: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Libro", libroSchema)
