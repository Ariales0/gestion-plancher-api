/*
 * ============================================================================
 * File: jwt.js
 * Project: Gestion plancher
 * Created Date: 24/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 21/11/2024
 * Modified By: Lyes Hamrani
 * -----
 * Copyright (c) 2024 Lyes Hamrani, Quentin Lecourt, Steve Lepage
 * ============================================================================
 * Description: Gestion des tokens JWT
 */

// <----------- Section importation ------------->
const jwt = require("jsonwebtoken"); // Importation du module jsonwebtoken

// <----------- Section configuration ------------->
// === Configuration du secret ===
const SecretKey = process.env.TOKEN_SECRET;
// === Configuration de la durée de validité du token ===
const expiresIn = process.env.TOKEN_LIFE;

const creationEmail = process.env.CREATION_EMAIL

// <----------- Section function ------------->
module.exports = {
  // === Génération du acces token ===
  generateAccessToken: function (email) {
    return jwt.sign({ email: email }, SecretKey, {
      expiresIn: expiresIn,
    });
  },
  // === Génération du app token ===
  generateAppToken: function (user) {
    return jwt.sign(user, SecretKey, {});
  },
  // === Vérification du token ===
  verifyToken: function (token) {
    try{
      return jwt.verify(token, SecretKey);
    } catch (err) {
      throw new Error("Token invalide");
    }
  },
  // === Vérification du app token ===
  verifyApplicationToken: (appToken) => {
    try {
      const decoded = jwt.verify(appToken, SecretKey);
      return decoded.uname === creationEmail;
    } catch {
      return false;
    }
  }
};

