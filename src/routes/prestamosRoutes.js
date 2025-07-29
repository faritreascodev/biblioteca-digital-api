const express = require("express")
const prestamosController = require("../controllers/prestamosController")
const router = express.Router()

/**
 * @swagger
 * /api/prestamos:
 *   get:
 *     summary: Obtener todos los préstamos
 *     tags: [Préstamos]
 *     parameters:
 *       - in: query
 *         name: usuario
 *         schema:
 *           type: string
 *         description: Filtrar por usuario
 *       - in: query
 *         name: devuelto
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado
 *     responses:
 *       200:
 *         description: Lista de préstamos
 */
router.get("/", prestamosController.obtenerPrestamos)

/**
 * @swagger
 * /api/prestamos/usuario/{usuario}:
 *   get:
 *     summary: Historial de préstamos por usuario
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historial del usuario
 */
router.get("/usuario/:usuario", prestamosController.obtenerHistorialUsuario)

/**
 * @swagger
 * /api/prestamos/{id}:
 *   get:
 *     summary: Obtener préstamo por ID
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del préstamo
 */
router.get("/:id", prestamosController.obtenerPrestamoPorId)

/**
 * @swagger
 * /api/prestamos:
 *   post:
 *     summary: Crear nuevo préstamo
 *     tags: [Préstamos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libro
 *               - usuario
 *             properties:
 *               libro:
 *                 type: string
 *               usuario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Préstamo creado
 */
router.post("/", prestamosController.crearPrestamo)

/**
 * @swagger
 * /api/prestamos/{id}/devolver:
 *   patch:
 *     summary: Devolver libro
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libro devuelto
 */
router.patch("/:id/devolver", prestamosController.devolverLibro)

/**
 * @swagger
 * /api/prestamos/{id}:
 *   delete:
 *     summary: Eliminar préstamo
 *     tags: [Préstamos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Préstamo eliminado
 */
router.delete("/:id", prestamosController.eliminarPrestamo)

module.exports = router