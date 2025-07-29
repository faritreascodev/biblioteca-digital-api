const express = require("express")
const librosController = require("../controllers/librosController")
const router = express.Router()

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Libros]
 *     parameters:
 *       - in: query
 *         name: autor
 *         schema:
 *           type: string
 *         description: Filtrar por autor
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: disponible
 *         schema:
 *           type: boolean
 *         description: Filtrar por disponibilidad
 *     responses:
 *       200:
 *         description: Lista de libros
 */
router.get("/", librosController.obtenerLibros)

/**
 * @swagger
 * /api/libros/buscar:
 *   get:
 *     summary: Buscar libros por título
 *     tags: [Libros]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 */
router.get("/buscar", librosController.buscarLibros)

/**
 * @swagger
 * /api/libros/{id}:
 *   get:
 *     summary: Obtener libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del libro
 */
router.get("/:id", librosController.obtenerLibroPorId)

/**
 * @swagger
 * /api/libros:
 *   post:
 *     summary: Crear nuevo libro
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autores
 *               - categorias
 *               - isbn
 *             properties:
 *               titulo:
 *                 type: string
 *               autores:
 *                 type: array
 *                 items:
 *                   type: string
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 *               isbn:
 *                 type: string
 *               fechaPublicacion:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Libro creado
 */
router.post("/", librosController.crearLibro)

/**
 * @swagger
 * /api/libros/{id}:
 *   put:
 *     summary: Actualizar libro
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *     responses:
 *       200:
 *         description: Libro actualizado
 */
router.put("/:id", librosController.actualizarLibro)

/**
 * @swagger
 * /api/libros/{id}:
 *   delete:
 *     summary: Eliminar libro
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libro eliminado
 */
router.delete("/:id", librosController.eliminarLibro)

module.exports = router
