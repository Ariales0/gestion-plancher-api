/*
 * ============================================================================
 * File: userController.js
 * Project: Gestion plancher
 * Created Date: 19/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 21/11/2024
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

// <------------------ Fonction création d'un app Token ------------------->
exports.getAppToken = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Données manquantes ❌",
        details: {
          email: !email ? "Email requis" : null,
          password: !password ? "Mot de passe requis" : null
        }
      });
    }

    if (email !== process.env.CREATION_EMAIL || password !== process.env.CREATION_PASS) {
      return res.status(401).json({ 
        error: "Accès non autorisé ⛔",
        message: "Contactez l'administrateur pour obtenir les accès ❗" 
      });
    }

    const accessToken = await jwt.generateAppToken({ uname: email });
    console.log('Token generated:', accessToken);
    
    return res.status(200).json({
      message: "Token généré avec succès ✅",
      appToken: accessToken
    });

  } catch (error) {
    console.error('Error in getAppToken:', error.message, error.stack);
    return res.status(500).json({
      error: "Erreur serveur lors de la génération du token ⚠️",
      details: error.message
    });
  }
};

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

    if (
      !first_name ||
      !last_name ||
      !address ||
      !city ||
      !zip ||
      !email ||
      !password
    ) {
      return res.json({
        error: "Tous les champs sont requis ❗",
        details: {
          first_name: !first_name ? "Le prénom est requis" : null,
          last_name: !last_name ? "Le nom est requis" : null,
          address: !address ? "L'adresse est requise" : null,
          city: !city ? "La ville est requise" : null,
          zip: !zip ? "Le code postal est requis" : null,
          email: !email ? "L'email est requis" : null,
          password: !password ? "Le mot de passe est requis" : null,
        },
      });
    }

    const existingUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "L'email saisi est déjà associé à un compte ⛔" });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      email: email.toLowerCase(),
      password: hashedPassword,
      type: "user",
      status: true,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès ✅" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur de l'enregistrement utilisateur ⚠️",
      error: error.message,
    });
  }
};

// <------------------ Fonction connexion d'un utilisateur ------------------->
exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.json({ error: "Email et mot de passe requis ❗" });
    }

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(400).json({ error: "Ce compte n'existe pas ⛔" });
    }

    const validPassword = await bycrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Mot de passe incorrect ❌" });
    }

    if (!user.status) {
      return res.status(403).json({
        error: "Votre compte n'est pas activé ⛔",
        message: "Veuillez contacter l'administrateur"
      });
     }

    const accessToken = jwt.generateAccessToken(user.email);
    res
      .status(200)
      .json({ message: "Connexion réussie ✅", token: accessToken });
  } catch (error) {
    res.status(500).json({ message: "Erreur de connexion utilisateur ⚠️" });
  }
};

// <------------------ Fonction deconnexion d'un utilisateur ------------------->
exports.logout = async function (req, res) {
  try {
    // Réponse de succès déconnexion de l'utilisateur
    res.status(200).json({ message: "Déconnexion réussie ✅" });
  } catch (error) {
    // Erreur lors de la déconnexion de l'utilisateur
    res.status(500).json({ message: "Erreur de déconnexion utilisateur ⚠️" });
  }
};

// <------------------ Fonction récupération des infos utilisateur ------------------->
exports.getUserInfo = async function (req, res) {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Aucun compte associé à cette adresse email ⛔" });
    } else {
      const formattedUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zip,
        email: user.email.toLowerCase(),
      };
      res.status(200).json({
        message: "Informations du compte récupérées avec succès ✅",
        user: formattedUser,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de récupération des informations ⚠️" });
  }
};

// <------------------ Fonction activation compte utilisateur ------------------->
exports.activateAccount = async (req, res) => {
  try {
    const { email, appToken } = req.body;

    if (!email || !appToken) {
      return res.status(400).json({
        error: "Données manquantes ❌",
        details: {
          email: !email ? "Email requis" : null,
          appToken: !appToken ? "Token d'application requis" : null,
        },
      });
    }

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({
        error: "Aucun compte associé à cette adresse email ⛔",
      });
    }

    if (!jwt.verifyApplicationToken(appToken)) {
      return res.status(401).json({
        error: "Token d'application invalide ⛔",
      });
    }

    if (user.status) {
      return res.status(400).json({
        error: "Ce compte est déjà activé ℹ️",
      });
    }

    user.status = true;
    await user.save();

    return res.status(200).json({
      message: "Compte activé avec succès ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors de l'activation du compte ⚠️",
    });
  }
};

// <------------------ Fonction desactiver un compte utilisateur ------------------->
exports.deactivateAccount = async (req, res) => {
  try {
    const { email, appToken } = req.body;

    if (!email || !appToken) {
      return res.status(400).json({
        error: "Données manquantes ❌",
        details: {
          email: !email ? "Email requis" : null,
          appToken: !appToken ? "Token d'application requis" : null,
        },
      });
    }

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({
        error: "Aucun compte associé à cette adresse email ⛔",
      });
    }

    if (!jwt.verifyApplicationToken(appToken)) {
      return res.status(401).json({
        error: "Token d'application invalide ❌",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        error: "Ce compte est déjà désactivé ℹ️",
      });
    }

    user.status = false;
    await user.save();

    return res.status(200).json({
      message: "Compte désactivé avec succès ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors de la désactivation du compte ⚠️",
    });
  }
};
