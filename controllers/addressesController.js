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

        return response.status(201).json({ success: true, message: "Endereço criado com sucesso: ", data: { createdAddress } });
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

        const foundAddresses = await Addresses.find({ owner: request.user.email, address: { $regex: '.*' + address + '.*', $options: 'i' } });

        if (foundAddresses.length === 0) {
            return response.status(404).json({ success: false, message: "Nenhum endereço encontrado" });
        }

        return response.status(200).json({ success: true, message: "Endereços encontrados", data: { foundAddresses } });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

const editAddress = async (request, response) => {
    try {
        const { id } = request.params;
        const { address } = request.body;
        const owner = request.user.email;

        if (!address) {
            return response.status(400).json({ success: false, message: "O endereço é obrigatório" });
        }

        const canYou = await Addresses.findOne({ _id: id, owner });
        if (!canYou) {
            return response.status(401).json({ success: false, message: "Você não tem permissão para editar este endereço" });
        }

        const editedAddress = await Addresses.findByIdAndUpdate(id, { address }, { new: true });

        return response.status(200).json({ success: true, message: "Endereço editado", data: { editedAddress } });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

export { createAddress, getAddresses, editAddress };