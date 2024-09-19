// <------------------ Importation des modules ------------------->
const bycrypt = require("bcrypt"); // Importation du module bcrypt
const User = require("../models/user"); // Importation du modèle User


// <------------------ Fonction création d'un utilisateur ------------------->
exports.register = async function (req, res) {
    try {
        // Récupération des données de la requête (body vu que c'est un POST)
        const { name, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà (pour l'instant on vérifie juste l'email)
        const existingUser  = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Cet utilisateur existe déjà !" });
        }

        // Cryptage du mot de passe avant de l'enregistrer
        const hashedPassword = await bycrypt.hash(password, 10);

        // Création d'un nouvel utilisateur dans la base de données
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Réponse de succès sans renvoyer le mot de passe de l'utilisateur
        res.status(201).json({
            message: "Utilisateur créé avec succès !",
            user :{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            }
        }); 
    }
    // Erreur lors de la création de l'utilisateur 
    catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        res.status(500).json({ message: "Erreur de l'enregistrement utilisateur" });
    }
};