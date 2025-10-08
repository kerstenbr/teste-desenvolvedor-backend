import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isLogged = async (request, response, next) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).send({ success: false, message: "Você precisa estar logado" });
    }

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (parts.length !== 2) {
      return response.status(401).send({ success: false, message: "Você precisa estar logado" });
    }

    if (schema !== "Bearer") {
      return response.status(401).send({ success: false, message: "Você precisa estar logado" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findById(decoded._id);

    if (!user) {
      return response.status(404).json({ success: false, message: "Usuário não encontrado" });
    }

    request.user = user

    next();
  } catch (error) {
    console.log(error);
    return response.status(500).send({ success: false, message: error.message });
  }
};

export { isLogged };