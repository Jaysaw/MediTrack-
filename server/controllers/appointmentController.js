const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ message: "Only patients can book appointments" });
        }

        const { department, doctor, date, timeSlot } = req.body;

        if (!department || !doctor || !date || !timeSlot) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await Appointment.findOne({
            doctor,
            date,
            timeSlot,
            status: { $ne: "rejected" },
        });

        if (existing) {
            return res
                .status(400)
                .json({ message: "Time slot already booked for this doctor" });
        }

        const appointment = await Appointment.create({
            department,
            doctor,
            patient: req.user.id,
            date,
            timeSlot,
        });

        res.status(201).json({
            message: "Appointment request sent successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.getAppointments = async (req, res) => {
    try {
        const filter =
            req.user.role === "doctor"
                ? { doctor: req.user.id }
                : { patient: req.user.id };

        const appointments = await Appointment.find(filter)
            .populate("doctor", "name")
            .populate("patient", "name")
            .sort({ createdAt: -1 });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateStatus = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Only doctors can update status" });
        }

        const { status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.status = status;
        await appointment.save();

        res.json({ message: "Appointment status updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};