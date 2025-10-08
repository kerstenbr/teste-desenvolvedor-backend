import Addresses from "../models/addressesModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_JWT, { expiresIn: "3d" });
}

const createAddress = async (request, response) => {
    try {
        const { street } = request.body;

        if (!street) {
            return response.status(400).json({ success: false, message: "O endereço é obrigatório" });
        }

        const address = await Addresses.create({ street, owner: request.user.email });

        return response.status(201).json({ success: true, message: "Endereço criado com sucesso: ", address });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
};

const getAddresses = async (request, response) => {}

export { createAddress, getAddresses };