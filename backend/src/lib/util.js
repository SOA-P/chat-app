import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // @ts-ignore
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // time in MS
    httpOnly: true, // previent les attacks XSS et script
    sameSite: "strict", // CSRF attacks cross site request forgery attack
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
