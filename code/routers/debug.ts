import express from "express";
import addDummyData from "../dummyData/addDummyData";

/**
 * @swagger
 * tags:
 *   name: DEBUG
 *   description: API endpoints for debug use.
 */

/**
 * Crea un objeto router.
 */
const debugRouter = express.Router();

/**
 * @swagger
 * /api/debug/populateDatabase:
 *   post:
 *     summary: Añade los datos de prueba
 *     description: Añade los datos de prueba a la base de datos. Tarda bastante.
 *     tags: [DEBUG]
 * 
 *     responses:
 *       201:
 *         description: Creado exitosamente
 */
debugRouter.post("/populateDatabase", addDummyData);


export default debugRouter;