const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
    createAppointment,
    getAppointments,
    updateStatus,
} = require("../controllers/appointmentController");

router.post("/", auth, role("patient"), createAppointment);
router.get("/", auth, getAppointments);
router.put("/:id", auth, role("doctor"), updateStatus);

module.exports = router;