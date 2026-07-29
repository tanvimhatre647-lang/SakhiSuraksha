import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. Invalid token format." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "sakhisuraksha_secret_key_2026");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: "Invalid token." });
  }
}
