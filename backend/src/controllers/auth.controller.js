// @ts-nocheck
import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Le mot de passe de contenir plus de 6 charactères" });
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

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
