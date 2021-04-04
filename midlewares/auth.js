const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ error: "No token provied" });
    }
    const parts = authHeader.split(" "); //

    if (!parts.length === 2)
      return res.status(401).send({ error: "Token error" });

    const [scheme, token] = parts;

    if (!scheme.includes("Bearer")) {
      // verificando se Bearer existe
      return res.status(401).send({ error: " Token malformatted" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {      
      if (err) return res.status(401).send({ error: "Token invalid" });
      req.userId = decoded.id; //alteração
    });

    return next();
  } catch (error) {
    throw new Error(error);
  }
};
