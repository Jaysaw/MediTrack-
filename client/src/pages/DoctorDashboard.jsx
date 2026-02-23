import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    LogOut,
    Bell,
    UserCircle,
    ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/logo.png";

export default function DoctorDashboard() {
    const { user, token, logout } = useAuth();
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const res = await axios.get(
            "http://https://meditrack-t4fq.onrender.com/api/appointments",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(res.data);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateStatus = async (id, status) => {
        await axios.put(
            `http://localhost:5000/api/appointments/${id}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchAppointments();
    };

    const total = appointments.length;
    const pending = appointments.filter(a => a.status === "pending").length;
    const approved = appointments.filter(a => a.status === "approved").length;
    const rejected = appointments.filter(a => a.status === "rejected").length;

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
                                Doctor
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
                    </nav>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-white/10"
                >
                    <LogOut size={18} /> Sign Out
                </button>
            </aside>


            <main className="flex-1">

                <div className="flex justify-between items-center px-8 py-4 bg-white border-b">
                    <p className="text-sm text-gray-500">
                        MediTrack <span className="mx-2">›</span>
                        <span className="font-medium text-gray-800">Dashboard</span>
                    </p>

                    <div className="flex items-center gap-6">
                        <button className="relative cursor-pointer hover:text-blue-600">
                            <Bell />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
                        </button>

                        <div className="w-9 h-9 rounded-full bg-cyan-100 text-blue-900 flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </div>


                <div className="p-8">

                    <div className="bg-gradient-to-r from-blue-900 to-teal-600 rounded-2xl p-8 text-white mb-8">
                        <h2 className="text-lg">Welcome,</h2>
                        <h1 className="text-3xl font-bold mt-1">
                            Dr. {user.name} 👋
                        </h1>
                        <p className="text-blue-100 mt-2">
                            Manage and respond to patient appointments
                        </p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <StatCard icon={<ClipboardList />} label="Total" value={total} />
                        <StatCard icon={<Clock />} label="Pending" value={pending} color="text-yellow-500" />
                        <StatCard icon={<CheckCircle />} label="Approved" value={approved} color="text-green-500" />
                        <StatCard icon={<XCircle />} label="Rejected" value={rejected} color="text-red-500" />
                    </div>


                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold mb-1">
                            Appointment Requests
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Review and manage patient appointments
                        </p>

                        {appointments.map(a => (
                            <div
                                key={a._id}
                                className="border rounded-xl p-5 flex justify-between items-center mb-4"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {a.patient?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {a.department} • {a.date} • {a.timeSlot}
                                    </p>
                                </div>

                                {a.status === "pending" ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => updateStatus(a._id, "approved")}
                                            className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(a._id, "rejected")}
                                            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <span
                                        className={`text-sm font-medium ${a.status === "approved"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {a.status.toUpperCase()}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
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
