import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    LogOut,
    Bell,
    UserCircle,
    ClipboardList,
    Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/logo.png";

const TIME_SLOTS = [
    "09:00 AM - 09:30 AM",
    "09:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "02:00 PM - 02:30 PM",
    "02:30 PM - 03:00 PM",
    "03:00 PM - 03:30 PM",
    "03:30 PM - 04:00 PM",
    "04:00 PM - 04:30 PM",
    "04:30 PM - 05:00 PM",
];

const DEPARTMENTS = [
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Dermatology",
    "Pediatrics",
    "ENT",
    "General Medicine",
];

export default function BookAppointment() {
    const { user, token, logout } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [form, setForm] = useState({
        department: "",
        doctor: "",
        date: "",
        notes: "",
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await axios.get("https://meditrack-su56.onrender.com/api/users/doctors", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDoctors(res.data);
        };
        fetchDoctors();
    }, [token]);

    const submit = async () => {
        if (!selectedSlot) {
            alert("Please select a time slot");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/appointments",
                { ...form, timeSlot: selectedSlot },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Appointment booked successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Booking failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside className="w-64 bg-[#0F2A44] text-white flex flex-col justify-between">
                <div>

                    <div className="flex items-center gap-3 px-6 py-6">
                        <img src={logo} className="w-9 h-9" />
                        <div>
                            <h1 className="text-lg font-bold">MediTrack</h1>
                            <p className="text-xs text-blue-200">Medical System</p>
                        </div>
                    </div>


                    <div className="flex items-center gap-3 bg-white/10 rounded-xl mx-4 mb-6 p-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-blue-900 font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <div className="flex items-center gap-1 text-xs text-blue-200 capitalize">
                                <UserCircle size={14} />
                                {user.role}
                            </div>
                        </div>
                    </div>


                    <nav className="space-y-2 px-4">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                        >
                            <Calendar size={18} /> Dashboard
                        </Link>

                        <Link
                            to="/book"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/20"
                        >
                            <Clock size={18} /> Book Appointment
                        </Link>

                        <Link
                            to="/appointments"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                        >
                            <Calendar size={18} /> My Appointments
                        </Link>
                    </nav>
                </div>


                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-white/10"
                >
                    <LogOut size={18} /> Sign Out
                </button>
            </aside>


            <main className="flex-1 overflow-y-auto">

                <div className="flex justify-between items-center px-8 py-4 bg-white border-b">
                    <p className="text-sm text-gray-500">
                        MediTrack <span className="mx-2">›</span>
                        <span className="font-medium text-gray-800">
                            Book Appointment
                        </span>
                    </p>

                    <div className="flex items-center gap-6">
                        <button className="relative cursor-pointer hover:text-blue-600">
                            <Bell />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
                        </button>

                        <div className="w-9 h-9 rounded-full bg-cyan-100 text-blue-900 flex items-center justify-center font-bold cursor-pointer">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </div>


                <div className="p-8 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-1">Book Appointment</h1>
                    <p className="text-gray-500 mb-8">
                        Schedule a visit with our medical specialists
                    </p>

                    <div className="bg-white rounded-2xl shadow p-8">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                <ClipboardList className="text-cyan-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Appointment Details</h3>
                                <p className="text-sm text-gray-500">
                                    Fill in the details to book your appointment
                                </p>
                            </div>
                        </div>


                        <div className="mb-6">
                            <label className="font-medium mb-2 block">Department</label>
                            <select
                                className="w-full p-4 border rounded-xl"
                                onChange={(e) =>
                                    setForm({ ...form, department: e.target.value })
                                }
                            >
                                <option value="">Select Department</option>
                                {DEPARTMENTS.map(dep => (
                                    <option key={dep}>{dep}</option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-6">
                            <label className="font-medium mb-2 block">Select Doctor</label>
                            <select
                                className="w-full p-4 border rounded-xl"
                                disabled={!form.department}
                                onChange={(e) =>
                                    setForm({ ...form, doctor: e.target.value })
                                }
                            >
                                <option value="">
                                    {form.department
                                        ? "Select Doctor"
                                        : "Select department first"}
                                </option>
                                {doctors.map(doc => (
                                    <option key={doc._id} value={doc._id}>
                                        Dr. {doc.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-6">
                            <label className="font-medium mb-2 block">Preferred Date</label>
                            <input
                                type="date"
                                className="w-full p-4 border rounded-xl"
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                            />
                        </div>


                        <div className="mb-6">
                            <label className="font-medium mb-3 block">Time Slot</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {TIME_SLOTS.map(slot => (
                                    <button
                                        key={slot}
                                        type="button"
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`p-3 rounded-xl border text-sm font-medium ${selectedSlot === slot
                                            ? "bg-cyan-500 text-white border-cyan-500"
                                            : "hover:border-cyan-400"
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className="mb-8">
                            <label className="font-medium mb-2 block">
                                Additional Notes (optional)
                            </label>
                            <textarea
                                rows="4"
                                className="w-full p-4 border rounded-xl"
                                placeholder="Describe your symptoms or reason for visit..."
                                onChange={(e) =>
                                    setForm({ ...form, notes: e.target.value })
                                }
                            />
                        </div>

                        <button
                            onClick={submit}
                            className="w-full bg-gradient-to-r from-blue-900 to-teal-600 text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
