import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    LogOut,
    Bell,
    UserCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

export default function PatientDashboard() {
    const { user, token, logout } = useAuth();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(
                    "https://meditrack-su56.onrender.com/api/appointments",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAppointments(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAppointments();
    }, [token]);

    const total = appointments.length;
    const pending = appointments.filter(a => a.status === "pending").length;
    const approved = appointments.filter(a => a.status === "approved").length;
    const rejected = appointments.filter(a => a.status === "rejected").length;

    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside className="w-64 bg-[#0F2A44] text-white flex flex-col justify-between">
                <div>

                    <div className="flex items-center gap-3 px-6 py-6">
                        <img src={logo} alt="MediTrack" className="w-9 h-9" />
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
                            <p className="font-semibold leading-tight">
                                {user.name}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-blue-200 capitalize">
                                <UserCircle size={14} />
                                {user.role}
                            </div>
                        </div>
                    </div>


                    <nav className="space-y-2 px-4">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/20"
                        >
                            <Calendar size={18} /> Dashboard
                        </Link>

                        <Link
                            to="/book"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
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


            <main className="flex-1 p-8 overflow-y-auto">

                <div className="flex justify-end items-center gap-6 mb-3">
                    <button className="relative cursor-pointer hover:text-blue-600 transition">
                        <Bell className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
                    </button>

                    <div className="w-9 h-9 rounded-full bg-cyan-100 text-blue-900 flex items-center justify-center font-bold cursor-pointer">
                        {user.name.charAt(0)}
                    </div>
                </div>


                <div className="mb-4">
                    <p className="text-sm text-gray-500">
                        <span className="font-medium text-blue-900">
                            MediTrack
                        </span>
                        <span className="mx-2">›</span>
                        <span className="font-medium text-gray-800">
                            Dashboard
                        </span>
                    </p>
                </div>


                <div className="bg-gradient-to-r from-blue-900 to-teal-600 rounded-2xl p-8 text-white mb-8">
                    <h2 className="text-lg">Good Evening,</h2>
                    <h1 className="text-3xl font-bold mt-1">
                        {user.name} 👋
                    </h1>
                    <p className="text-blue-100 mt-2">
                        Here's an overview of your health appointments
                    </p>

                    <Link
                        to="/book"
                        className="inline-block mt-6 bg-cyan-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-cyan-300"
                    >
                        + Book New Appointment
                    </Link>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Calendar />} label="Total Appointments" value={total} />
                    <StatCard icon={<Clock />} label="Pending Appointments" value={pending} color="text-yellow-500" />
                    <StatCard icon={<CheckCircle />} label="Approved Appointments" value={approved} color="text-green-500" />
                    <StatCard icon={<XCircle />} label="Rejected Appointments" value={rejected} color="text-red-500" />
                </div>


                <div className="bg-white rounded-2xl p-6 shadow">
                    <h3 className="text-lg font-semibold mb-1">
                        Recent Appointments
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Your latest appointment history
                    </p>

                    {appointments.length === 0 ? (
                        <p className="text-gray-400 text-center py-6">
                            No Appointments Yet
                        </p>
                    ) : (
                        appointments.slice(0, 3).map(appt => (
                            <div
                                key={appt._id}
                                className="flex justify-between items-center py-4 border-b last:border-none"
                            >
                                <div>
                                    <p className="font-semibold">
                                        Dr. {appt.doctor?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {appt.department} • {appt.date} • {appt.timeSlot}
                                    </p>
                                </div>
                                <span className="capitalize text-sm font-medium">
                                    {appt.status}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}


function StatCard({ icon, label, value, color = "text-blue-900" }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <div className="mb-3 text-blue-500">{icon}</div>
            <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
}
