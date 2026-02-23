import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header({ title }) {
    const { user } = useAuth();

    return (
        <header className="w-full flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm mb-6">

            <div>
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm text-gray-500 capitalize">
                    {user.role} Dashboard
                </p>
            </div>


            <div className="flex items-center gap-5">

                <button className="relative">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                        3
                    </span>
                </button>


                <div className="flex items-center gap-2 cursor-pointer">
                    <UserCircle className="w-9 h-9 text-gray-600" />
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}