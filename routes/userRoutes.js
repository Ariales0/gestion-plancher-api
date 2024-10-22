/*
 * ============================================================================
 * File: userRoutes.js
 * Project: Gestion plancher
 * Created Date: 19/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 24/09/2024
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

// <------------------ Routes ------------------->
// === Route d'enregistrement d'un utilisateur ===
/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Enregistre un nouvel utilisateur
 *     description: Crée un nouvel utilisateur dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Firstname:
 *                 type: string
 *               Lastname:
 *                 type: string
 *               Address:
 *                type: string
 *               City:
 *                type: string
 *               State:
 *                type: string
 *               Zip:
 *                type: string
 *               Country:
 *                type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Cet utilisateur existe déjà.
 *       500:
 *        description: Erreur d'enregistrement utilisateur.
 */
router.post("/register", userController.register);

// === Route de connexion d'un utilisateur ===
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Connecte un utilisateur
 *     description: Connecte un utilisateur en vérifiant les informations d'identification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès.
 *       400:
 *         description: Email ou mot de passe incorrect.
 *       500:
 *        description: Erreur de connexion utilisateur.
 */
router.post("/login", userController.login);

// === Route de déconnexion d'un utilisateur ===
/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags: [Users]
 *     summary: Déconnecte un utilisateur
 *     description: Déconnecte un utilisateur en supprimant le jeton d'authentification.
 *     responses:
 *       200:
 *         description: Utilisateur déconnecté avec succès.
 *       500:
 *        description: Erreur de déconnexion utilisateur.
 */
router.post("/logout", userController.logout);


// <------------------ Exportation du module ------------------->
module.exports = router;
