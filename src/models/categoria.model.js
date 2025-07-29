const mongoose = require("mongoose")

const categoriaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        descripcion: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Categoria", categoriaSchema)
