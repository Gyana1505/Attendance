import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    details: [{
        date: { type: String }, // store date like "2025-10-16"
        in_time: { type: String, default: null },
        out_time: { type: String, default: null },
        worked_hours: { type: String, default: null },
    }
    ]
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
