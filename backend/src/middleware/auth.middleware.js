import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // verifie si il recupère bien le token
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Non autorisé - Token non fourni" });
    }

    // on vient decode et verifier le token dans le cookie
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.status(401).json({ message: "Non autorisé - Token invalide" });
    }
    // on recupere le tout du userId sauf le password
    const user = await User.findById(decode.usedId).select("-password");
    if (!user) {
      res.status(404).json({ message: "l'utilisateur est introuvable" });
    }
    req.user = user;
  } catch (error) {}
};
