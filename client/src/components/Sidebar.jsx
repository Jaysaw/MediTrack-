import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { user, logout } = useAuth();

    return (
        <aside className="w-64 bg-[#0b2c4d] text-white min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-8">MediTrack</h1>

            <div className="mb-6">
                <p className="font-semibold">{user.name}</p>
                <span className="text-sm text-gray-300 capitalize">{user.role}</span>
            </div>

            <nav className="space-y-3">
                <Link to="/" className="block p-2 rounded hover:bg-blue-800">Dashboard</Link>

                {user.role === "patient" && (
                    <Link to="/book" className="block p-2 rounded hover:bg-blue-800">
                        Book Appointment
                    </Link>
                )}

                <Link to="/appointments" className="block p-2 rounded hover:bg-blue-800">
                    My Appointments
                </Link>
            </nav>

            <button onClick={logout} className="mt-10 text-red-400 hover:text-red-500">
                Sign Out
            </button>
        </aside>
    );
}