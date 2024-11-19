const Thermostat = require("../models/thermostat");
const User = require("../models/user");
const Broker = require("../models/broker");

// <------------------ Fonction création d'un thermostat ------------------->
exports.create = async function (req, res) {
  try {
    // Récupération des données de la requête
    const { name, userEmail, brokerIP } = req.body;
    // Vérification de l'existence de l'utilisateur et du broker
    const user = await User.findOne({ where: { email: userEmail } });
    const broker = await Broker.findOne({ where: { ipv4: brokerIP } });
    if (!user || !broker) {
      return res.status(400).json({
        message:
          "Les informations de l'utilisateur ou du broker sont incorrectes !",
      });
    }
    // Vérification de l'existence du thermostat
    const existingThermostat = await Thermostat.findOne({
      where: {
        name,
        user_id: user.id,
        broker_id: broker.id,
      },
    });
    if (existingThermostat) {
      return res.status(400).json({ message: "Le thermostat existe déjà !" });
    } else {
      // Création du thermostat
      const thermostat = await Thermostat.create({
        name,
        user_id: user.id,
        broker_id: broker.id,
      });
      return res.status(201).json({
        message: "Thermostat créé avec succès !",
        thermostat: thermostat,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur de l'enregistrement du thermostat:",
      error: error.message,
    });
  }
};

// <------------------ Fonction récupération de tous les thermostats ------------------->
exports.getAll = async function (req, res) {
  try {
    const thermostats = await Thermostat.findAll();
    res.status(200).json(thermostats);
  } catch (error) {
    res.status(500).json({
      message: "Erreur de récupération des thermostats:",
      error: error.message,
    });
  }
};

exports.getAllByUser = async function (req, res) {
  try {
    const { userEmail } = req.params;
    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas !" });
    } else {
      const thermostats = await Thermostat.findAll({
        where: { user_id: user.id },
      });
      res.status(200).json({
        message: "Liste des thermostats récupérée avec succès !",
        thermostats: thermostats,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur de récupération des thermostats:",
      error: error.message,
    });
  }
};

// <------------------ Fonction récupération d'un thermostat ------------------->
exports.getOne = async function (req, res) {
  try {
    const { name, userEmail } = req.params;
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas !" });
    } else {
      const thermostat = await Thermostat.findOne({
        where: {
          name,
          user_id: user.id,
        },
      });
      res.status(200).json({
        message: "Thermostat récupéré avec succès !",
        thermostat: thermostat,
      });
      if (!thermostat) {
        return res
          .status(400)
          .json({ message: "Le thermostat n'existe pas !" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur de récupération du thermostat:",
      error: error.message,
    });
  }
};

// <------------------ Fonction suppression d'un thermostat ------------------->
exports.delete = async function (req, res) {
  try {
    const { name, userEmail } = req.params;
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas !" });
    } else {
      const thermostat = await Thermostat.findOne({
        where: {
          name,
          user_id: user.id,
        },
      });
      if (!thermostat) {
        return res.status(400).json({ message: "Le thermostat n'existe pas !" });
      } else {
        await thermostat.destroy();
        res.status(200).json({ message: "Thermostat supprimé avec succès !" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur de suppression du thermostat:",
      error: error.message,
    });
  }
}