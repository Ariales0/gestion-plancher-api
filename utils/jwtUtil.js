/*
 * ============================================================================
 * File: jwt.js
 * Project: Gestion plancher
 * Created Date: 24/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 24/09/2024
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
const accessSecretKey = process.env.ACCESS_TOKEN_SECRET;
// === Configuration de la durée de validité du token ===
const expiresIn = process.env.ACCESS_TOKEN_LIFE;

// <----------- Section function ------------->
module.exports = {
  // === Génération du token ===
  generateAccessToken: function (user) {
    return jwt.sign({ id: user.id, role: user.role }, accessSecretKey, {
      expiresIn: expiresIn,
    });
  },
  // === Vérification du token ===
  verifyToken: function (token) {
    return jwt.verify(token, accessSecretKey);
  },
};
