/*
 * ============================================================================
 * File: userRoutes.js
 * Project: Gestion plancher
 * Created Date: 19/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 21/11/2024
 * Modified By: Lyes Hamrani
 * -----
 * Copyright (c) 2024 Lyes Hamrani, Quentin Lecourt, Steve Lepage
 * ============================================================================
 * Description: Routes thermostat
 * ============================================================================
 */
//<------------------ Section Importation des modules ------------------->
const express = require("express");
const router = express.Router();
const thermostatController = require("../controllers/thermostatController");

//<------------------ Section Routes avec documentation swagger ------------------->

/**
 * @swagger
 * components:
 *   schemas:
 *     Thermostat:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         user_id:
 *           type: integer
 *         broker_id:
 *           type: integer
 */

/**
 * @swagger
 * /thermostats/create:
 *   post:
 *     tags: [Thermostats]
 *     summary: Crée un nouveau thermostat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               brokerIP:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thermostat créé avec succès
 *       400:
 *         description: Données invalides ou thermostat existant
 *       500:
 *         description: Erreur serveur
 */
router.post("/create", thermostatController.create);

/**
 * @swagger
 * /thermostats/list:
 *   get:
 *     tags: [Thermostats]
 *     summary: Liste tous les thermostats
 *     responses:
 *       200:
 *         description: Liste des thermostats récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Thermostat'
 *       500:
 *         description: Erreur serveur
 */
router.get("/list", thermostatController.getAll);

/**
 * @swagger
 * /thermostats/listByUser/{userEmail}:
 *   get:
 *     tags: [Thermostats]
 *     summary: Liste les thermostats d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: userEmail
 *         required: true
 *         schema:
 *           type: string
 *         description: Email de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des thermostats récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Thermostat'
 *       400:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/listByUser/:userEmail", thermostatController.getAllByUser);

/**
 * @swagger
 * /thermostats/get/{name}/{userEmail}:
 *   get:
 *     tags: [Thermostats]
 *     summary: Récupère un thermostat spécifique
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom du thermostat
 *       - in: path
 *         name: userEmail
 *         required: true
 *         schema:
 *           type: string
 *         description: Email de l'utilisateur
 *     responses:
 *       200:
 *         description: Thermostat trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thermostat'
 *       404:
 *         description: Thermostat non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/get/:name/:userEmail", thermostatController.getOne);

/**
* @swagger
* /thermostats/delete/{name}/{userEmail}:
*   delete:
*     tags: [Thermostats]
*     summary: Supprime un thermostat
*     parameters:
*       - in: path
*         name: name
*         required: true
*         schema:
*           type: string
*         description: Nom du thermostat
*       - in: path
*         name: userEmail
*         required: true
*         schema:
*           type: string
*         description: Email de l'utilisateur
*     responses:
*       200:
*         description: Thermostat supprimé avec succès
*       400:
*         description: Utilisateur ou thermostat non trouvé
*       500:
*         description: Erreur serveur
*/
router.delete("/delete/:name/:userEmail", thermostatController.delete);

module.exports = router;