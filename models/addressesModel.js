import mongoose from "mongoose";
import { Schema } from "mongoose";

const addressesSchema = new Schema({
    street: { type: String, required: true },
    owner: { type: String, required: true },
});

const Addresses = mongoose.model("Addresses", addressesSchema);

export default Addresses;
