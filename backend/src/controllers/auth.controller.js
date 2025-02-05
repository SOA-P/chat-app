// @ts-nocheck
import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    if (!password || !email || !fullName) {
      return res
        .status(400)
        .json({ message: "toute les données sont nécessaire" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir plus de 6 charactères",
      });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "L'email  existe déjà)" });

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    });

    if (newUser) {
      //generation du token jwt ici !
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilPic,
      });
    } else {
      res
        .status(400)
        .json({ message: "Les données d'utilisateur sont invalides" });
    }
  } catch (error) {
    console.log("erreur de connexion", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  // il nous faut l'email et le password afin de se connecter , c'est ce que l'on va récuperer ici.
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "les identifiants ne sont pas valide" });
    }
    // on verifie et on compare que les identifiant sont correct en mode boolean
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // si il est different de isPasswordCorrect return un erreur 400
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "les identifiants ne sont pas valide" });
    } // Sinon retourn moi le token et le userId avec l'objet JSON
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilPic: user.profilePic,
    });
  } catch (error) {
    console.log("errur de connexion", error.message);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Deconnexion réussie" });
  } catch (error) {
    console.log("Erreur de deconnexion", error.message);
  }
};

export const updateProfil = async (req, res) => {};
