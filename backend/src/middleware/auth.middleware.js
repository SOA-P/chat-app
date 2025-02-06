import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Non autorisé - Token non fourni" });
    }

    // @ts-ignore
    // on vient decode et verifier le token dans le cookie
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Non autorisé - Token invalide" });
    }
    // on recupere le tout du user sauf le password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "l'utilisateur est introuvable" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Erreur dans la protectRoute middleware", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
