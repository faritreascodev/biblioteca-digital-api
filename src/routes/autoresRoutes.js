const express = require("express")
const autoresController = require("../controllers/autoresController")
const router = express.Router()

/**
 * @swagger
 * /api/autores:
 *   get:
 *     summary: Obtener todos los autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autor'
 */
router.get("/", autoresController.obtenerAutores)

/**
 * @swagger
 * /api/autores/{id}:
 *   get:
 *     summary: Obtener autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del autor
 *       404:
 *         description: Autor no encontrado
 */
router.get("/:id", autoresController.obtenerAutorPorId)

/**
 * @swagger
 * /api/autores:
 *   post:
 *     summary: Crear nuevo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               nacionalidad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor creado
 */
router.post("/", autoresController.crearAutor)

/**
 * @swagger
 * /api/autores/{id}:
 *   put:
 *     summary: Actualizar autor
 *     tags: [Autores]
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
 *             $ref: '#/components/schemas/Autor'
 *     responses:
 *       200:
 *         description: Autor actualizado
 */
router.put("/:id", autoresController.actualizarAutor)

/**
 * @swagger
 * /api/autores/{id}:
 *   delete:
 *     summary: Eliminar autor
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Autor eliminado
 */
router.delete("/:id", autoresController.eliminarAutor)

module.exports = router
