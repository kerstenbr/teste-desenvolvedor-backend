import User from "../models/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_JWT, { expiresIn: "3d" });
}

const register = async (request, response) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({ success: false, message: "Nome, email e senha são obrigatórios" });
        }

        const alreadyExists = await User.findOne({ email });
        if (alreadyExists) {
            return response.status(400).json({ success: false,message: "Este email já está em uso" });
        }

        const user = await User.create({ name, email, password });

        const token = createToken(user._id);

        return response.status(201).json({ success: true, token });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
};

export { register };