const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// Get all doctors
router.get("/doctors", auth, async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" }).select("name email");
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch doctors" });
    }
});

module.exports = router;