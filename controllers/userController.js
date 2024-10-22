/*
 * ============================================================================
 * File: userController.js
 * Project: Gestion plancher
 * Created Date: 19/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 24/09/2024
 * Modified By: Lyes Hamrani
 * -----
 * Copyright (c) 2024 Lyes Hamrani, Quentin Lecourt, Steve Lepage
 * ============================================================================
 * Description: Contrôleur des utilisateurs
 * ============================================================================
 */

// <------------------ Importation des modules ------------------->
const bycrypt = require("bcrypt"); // Importation du module bcrypt
const User = require("../models/user"); // Importation du modèle User
const jwt = require("../utils/jwt"); // Importation du module jwt

// <------------------ Fonction création d'un utilisateur ------------------->
exports.register = async function (req, res) {
  try {
    // Récupération des données de la requête (body vu que c'est un POST)
    const {
      FirstName,
      LastName,
      Address,
      City,
      State,
      Zip,
      Country,
      Email,
      Password,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà (pour l'instant on vérifie juste l'email)
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ error: "Cet utilisateur existe déjà !" });
    }

    // Cryptage du mot de passe avant de l'enregistrer
    const hashedPassword = await bycrypt.hash(Password, 10);

    // Création d'un nouvel utilisateur dans la base de données
    const newUser = await User.create({
      FirstName,
      LastName,
      Address,
      City,
      State,
      Zip,
      Country,
      Email,
      Password: hashedPassword,
    });

    // Réponse de succès création de l'utilisateur
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    // Erreur lors de la création de l'utilisateur
    res.status(500).json({ message: "Erreur de l'enregistrement utilisateur", error: error.message });
  }
};

// <------------------ Fonction connexion d'un utilisateur ------------------->
exports.login = async function (req, res) {
  try {
    // Récupération des données de la requête (body vu que c'est un POST)
    const { Email, Password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(400).json({ error: "L'utilisateur n'existe pas !" });
    }

    // Vérification du mot de passe de l'utilisateur avec celui enregistré dans la BD (bcrypt compare les deux)
    const validPassword = await bycrypt.compare(Password, user.Password);
    if (!validPassword) {
      return res.status(400).json({ error: "Mot de passe incorrect !" });
    }

    // Réponse de succès connexion de l'utilisateur
    const accessToken = jwt.generateAccessToken(user);
    res
      .status(200)
      .json({ message: "Connexion réussie !", token: accessToken });
  } catch (error) {
    // Erreur lors de la connexion de l'utilisateur
    res.status(500).json({ message: "Erreur de connexion utilisateur" });
  }
};

// <------------------ Fonction deconnexion d'un utilisateur ------------------->
exports.logout = async function (req, res) {
  try {
    // Réponse de succès déconnexion de l'utilisateur
    res.status(200).json({ message: "Déconnexion réussie !" });
  } catch (error) {
    // Erreur lors de la déconnexion de l'utilisateur
    res.status(500).json({ message: "Erreur de déconnexion utilisateur" });
  }
};