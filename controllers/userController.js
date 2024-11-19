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
const jwt = require("../utils/jwtUtil"); // Importation du module jwt

// <------------------ Fonction création d'un utilisateur ------------------->
exports.register = async function (req, res) {
  try {
    const {
      first_name,
      last_name,
      address,
      city,
      state,
      zip,
      email,
      password,
      type = "user",
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Cet utilisateur existe déjà !" });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      address,
      city,
      state,
      zip,
      email,
      password: hashedPassword,
      type,
      status: true,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur de l'enregistrement utilisateur",
      error: error.message,
    });
  }
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "L'utilisateur n'existe pas !" });
    }

    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Mot de passe incorrect !" });
    }

    const accessToken = jwt.generateAccessToken(user);
    res
      .status(200)
      .json({ message: "Connexion réussie !", token: accessToken });
  } catch (error) {
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

// <------------------ Fonction récupération de tous les utilisateurs ------------------->
exports.getUserInfo = async function (req, res) {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "L'utilisateur n'existe pas !" });
    } else {
      const formattedUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zip,
        email: user.email,
      };
      res
        .status(200)
        .json({
          message: "Informations récupérées avec succès",
          user: formattedUser,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de récupération des informations" });
  }
};
