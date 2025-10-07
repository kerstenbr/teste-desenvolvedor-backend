import User from "../models/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_JWT, { expiresIn: "3d" });
}

const register = async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
        }

        const alreadyExists = await User.findOne({ email });
        if (alreadyExists) {
            return response.status(400).json({ success: false, message: "Este email já está em uso" });
        }

        const user = await User.create({ email, password });

        const token = createToken(user._id);

        return response.status(201).json({ success: true, token });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
};

const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return response.status(400).json({ success: false, message: "Email ou senha inválidos" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return response.status(400).json({ success: false, message: "Email ou senha inválidos" });
        }

        const token = createToken(user._id);
        return response.status(200).json({ success: true, token });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

export { register, login };