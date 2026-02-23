import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    LogOut,
    Bell,
    UserCircle,
    Search,
    Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/logo.png";

export default function MyAppointments() {
    const { user, token, logout } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            const res = await axios.get(
                "https://meditrack-su56.onrender.com/api/appointments",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAppointments(res.data);
        };
        fetchAppointments();
    }, [token]);

    const filteredAppointments = appointments.filter((a) => {
        const matchStatus =
            filter === "all" ? true : a.status === filter;
        const matchSearch =
            a.doctor?.name.toLowerCase().includes(search.toLowerCase()) ||
            a.department.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

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
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                        >
                            <Clock size={18} /> Book Appointment
                        </Link>

                        <Link
                            to="/appointments"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/20"
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


            <main className="flex-1">

                <div className="flex justify-between items-center px-8 py-4 bg-white border-b">
                    <p className="text-sm text-gray-500">
                        MediTrack <span className="mx-2">›</span>
                        <span className="font-medium text-gray-800">Appointments</span>
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
                    <h1 className="text-3xl font-bold mb-1">My Appointments</h1>
                    <p className="text-gray-500 mb-6">
                        View and track your appointment history
                    </p>


                    <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 items-center mb-8">
                        <div className="flex items-center gap-2 border rounded-xl px-4 py-2 flex-1">
                            <Search className="text-gray-400" />
                            <input
                                placeholder="Search by doctor, department..."
                                className="outline-none w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {["all", "pending", "approved", "rejected"].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-5 py-2 rounded-full text-sm font-medium ${filter === s
                                    ? "bg-blue-900 text-white"
                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>


                    <div className="bg-white rounded-2xl shadow p-6">
                        <p className="text-sm text-gray-500 mb-4">
                            Showing {filteredAppointments.length} of{" "}
                            {appointments.length} appointments
                        </p>

                        {filteredAppointments.map((a) => (
                            <div
                                key={a._id}
                                className="border rounded-xl p-5 flex gap-4 items-center mb-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                                    <Stethoscope className="text-cyan-600" />
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold">
                                        Dr. {a.doctor?.name}{" "}
                                        <span
                                            className={`ml-2 text-xs font-medium ${a.status === "pending"
                                                ? "text-yellow-600"
                                                : a.status === "approved"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            ● {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                                        </span>
                                    </p>

                                    <p className="text-sm text-gray-500">{a.department}</p>

                                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} /> {a.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {a.timeSlot}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
