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
 * Description: Routes utilisateur
 * ============================================================================
 */

// <------------------ Section Importation ------------------->
const express = require("express"); // Importation du module express
const router = express.Router(); // Création d'un routeur express
const userController = require("../controllers/userController"); // Importation du contrôleur utilisateur

// <------------------ Section Routes avec documentation swagger ------------------->
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zip:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         type:
 *           type: string
 *           default: "user"
 *         status:
 *           type: boolean
 *           default: true
 */

/**
* @swagger
* /users/getAppToken:
*   post:
*     tags: [Users]
*     summary: Récupère un token d'application
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password :
*                 type: string
*     responses:
*       200:
*         description: Token généré avec succès
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 AppToken:
*                   type: string
*       401:
*         description: Accès non autorisé
*       400:
*         description: Données manquantes
*/
router.post("/getAppToken", userController.getAppToken);

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Enregistre un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Utilisateur existe déjà
 */
router.post("/register", userController.register);
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Connecte un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Email ou mot de passe incorrect
 */
router.post("/login", userController.login);
/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags: [Users]
 *     summary: Déconnecte un utilisateur
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post("/logout", userController.logout);

// <------------------ Section Routes sans documentation swagger ------------------->
/**
* @swagger
* /users/info/{email}:
*   get:
*     tags: [Users]
*     summary: Récupère les informations d'un utilisateur
*     parameters:
*       - in: path
*         name: email
*         required: true
*         schema:
*           type: string
*         description: Email de l'utilisateur
*     responses:
*       200:
*         description: Informations récupérées avec succès
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 first_name:
*                   type: string
*                 last_name:
*                   type: string
*                 address:
*                   type: string
*                 city:
*                   type: string
*                 state:
*                   type: string
*                 zip:
*                   type: string
*                 email:
*                   type: string
*       400:
*         description: Utilisateur non trouvé
*       500:
*         description: Erreur serveur
*/
router.get("/info/:email", userController.getUserInfo);

/**
* @swagger
* /users/activate:
*   post:
*     tags: [Users] 
*     summary: Active un compte utilisateur
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               appToken:
*                 type: string
*     responses:
*       200:
*         description: Compte activé avec succès
*       401:
*         description: Token invalide
*       404:
*         description: Utilisateur non trouvé
*/
router.post("/activate", userController.activateAccount);

/**
* @swagger
* /users/deactivate:
*   post:
*     tags: [Users]
*     summary: Désactive un compte utilisateur
*     requestBody:
*       required: true 
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               appToken:
*                 type: string
*     responses:
*       200:
*         description: Compte désactivé avec succès
*       401:
*         description: Token invalide
*       404:
*         description: Utilisateur non trouvé
*/
router.post("/deactivate", userController.deactivateAccount);

// <------------------ Exportation du module ------------------->
module.exports = router;
