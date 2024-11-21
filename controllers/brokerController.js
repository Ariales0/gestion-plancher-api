/*
 * ============================================================================
 * File: brokerController.js
 * Project: Gestion plancher
 * Created Date: 19/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 21/11/2024
 * Modified By: Lyes Hamrani
 * -----
 * Copyright (c) 2024 Lyes Hamrani, Quentin Lecourt, Steve Lepage
 * ============================================================================
 * Description: Contrôleur des brokers
 * ============================================================================
 */
// <------------------ Importation des modules ------------------->
const Broker = require("../models/broker");

// <------------------ Fonction création d'un broker ------------------->
exports.create = async function (req, res) {
  try {
    const { name, ipv4, port } = req.body;
    if (!name || !ipv4 || !port) {
      return res.json({
        error: "Tous les champs sont requis ❗",
        details: {
          name: !name ? "Le nom est requis" : null,
          ipv4: !ipv4 ? "L'adresse IPv4 est requise" : null,
          port: !port ? "Le port est requis" : null
        }
      });
     }

    const existingBroker = await Broker.findOne({ where: { ipv4: ipv4 } });
    if (existingBroker) {
      return res.status(400).json({ error: "Ce broker existe déjà ⛔" });
    }

    const newBroker = await Broker.create({
      name,
      ipv4,
      port,
    });

    res.status(201).json({ message: "Broker créé avec succès ✅" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur de l'enregistrement du broker ⚠️",
      error: error.message,
    });
  }
};

// <------------------ Fonction récupération de tous les brokers ------------------->
exports.getAll = async function (req, res) {
  try {
    const brokers = await Broker.findAll();
    res.status(200).json({
      message: "Liste des brokers récupérée avec succès ✅",
      brokers: brokers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur de récupération des brokers ⚠️",
      error: error.message,
    });
  }
};

// <------------------ Fonction récupération d'un broker ------------------->
exports.getOne = async function (req, res) {
  try {
    const { name } = req.params;
    if (!name) {
      return res.json({ error: "Nom du broker est requis ❗" });
    }

    const broker = await Broker.findOne({ where: { name: name } });
    res.status(200).json(broker);
    if (!broker) {
      return res.status(404).json({ error: "Ce broker n'existe pas ⛔" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur de récupération du broker ⚠️",
      error: error.message,
    });
  }
};
