import mongoose from "mongoose";
import { Schema } from "mongoose";

const logsSchema = new Schema({
    user: { type: String, required: true },
    operation: { type: String, required: true },
    before: { type: Object, required: true },
    after: { type: Object, required: true },
    date: { type: Date, default: Date.now }
});

const Logs = mongoose.model("Logs", logsSchema);

export default Logs;
