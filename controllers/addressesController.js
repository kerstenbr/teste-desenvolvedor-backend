import Addresses from "../models/addressesModel.js";
import Logs from "../models/logsModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const createToken = (_id, expiresIn) => {
    return jwt.sign({ _id }, process.env.SECRET_JWT, { expiresIn: "3d" });
}

const createAddress = async (request, response) => {
    try {
        const { address } = request.body;

        if (!address) {
            return response.status(400).json({ success: false, message: "O endereço é obrigatório" });
        }

        const createdAddress = await Addresses.create({ address, owner: request.userId });

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

        const foundAddresses = await Addresses.find({ owner: request.userId, address: { $regex: '.*' + address + '.*', $options: 'i' } });

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
        const owner = request.userId;

        if (!address) {
            return response.status(400).json({ success: false, message: "O endereço é obrigatório" });
        }

        const oldAddress = await Addresses.findOne({ _id: id, owner });

        const editedAddress = await Addresses.findOneAndUpdate(
            { _id: id, owner },
            { address },
            { new: true }
        );

        if (!editedAddress) {
            return response.status(404).json({
                success: false,
                message: "Endereço não encontrado ou você não tem permissão"
            });
        }

        await Logs.create({
            user: owner,
            operation: "PUT",
            before: { oldAddress },
            after: { editedAddress },
            date: new Date()
        })

        return response.status(200).json({ success: true, message: "Endereço editado", data: { editedAddress } });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

const deleteAddress = async (request, response) => {
    try {
        const { id } = request.params;
        const owner = request.userId;

        if (!id) {
            return response.status(400).json({ success: false, message: "O id é obrigatório" });
        }

        const deletedAddress = await Addresses.findOneAndDelete(
            { _id: id, owner }
        );

        if (!deletedAddress) {
            return response.status(404).json({
                success: false,
                message: "Endereço não encontrado ou você não tem permissão"
            });
        }

        await Logs.create({
            user: owner,
            operation: "DELETE",
            before: { deletedAddress },
            after: { address: null },
            date: new Date()
        })

        return response.status(200).json({ success: true, message: "Endereço deletado", data: { deletedAddress } });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

const shareAddress = async (request, response) => {
    try {
        const { id } = request.params;
        const { expiresIn } = request.body || "1h";
        const owner = request.userId;

        if (!id) {
            return response.status(400).json({ success: false, message: "O id é obrigatório" });
        }

        const address = await Addresses.findOne({ _id: id, owner });

        if (!address) {
            return response.status(404).json({
                success: false,
                message: "Endereço não encontrado ou você não tem permissão"
            });
        }

        const token = createToken(address._id, expiresIn);

        return response.status(200).json({ success: true, message: "Endereço compartilhado", data: { token } });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

const seeAddress = async (request, response) => {
    try {
        const { token } = request.params;

        if (!token) {
            return response.status(400).json({ success: false, message: "O token é obrigatório" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        const address = await Addresses.findById(decoded._id);

        if (!address) {
            return response.status(404).json({ success: false, message: "Endereço não encontrado" });
        }

        return response.status(200).json({ success: true, message: "Endereço encontrado", data: { address } });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ success: false, message: error.message });
    }
}

export { createAddress, getAddresses, editAddress, deleteAddress, shareAddress, seeAddress };