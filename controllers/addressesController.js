import Addresses from "../models/addressesModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_JWT, { expiresIn: "3d" });
}

const createAddress = async (request, response) => {
    try {
        const { address } = request.body;

        if (!address) {
            return response.status(400).json({ success: false, message: "O endereço é obrigatório" });
        }

        const createdAddress = await Addresses.create({ address, owner: request.user.email });

        return response.status(201).json({ success: true, message: "Endereço criado com sucesso: ", createdAddress });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
};

const getAddresses = async (request, response) => {
    try {
        const { address } = request.query;

        if (!address) {
            return response.status(400).json({ success: false, message: "O endereço é obrigatório" });
        }

        const foundAddress = await Addresses.find({ owner: request.user.email, address: { $regex: '.*' + address + '.*', $options: 'i' } });

        return response.status(200).json({ success: true, message: foundAddress });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

export { createAddress, getAddresses };