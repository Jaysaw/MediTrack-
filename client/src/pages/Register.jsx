import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { User, Mail, Lock, Stethoscope, Eye } from "lucide-react";
import logo from "../assets/logo.png";
import hero from "../assets/hero-bg.jpg";

export default function Register() {
    const [role, setRole] = useState("patient");

    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;

        try {
            await axios.post("http://https://meditrack-t4fq.onrender.com/api/auth/register", {
                name: form.name.value,
                email: form.email.value,
                password: form.password.value,
                role,
            });
            alert("Account created successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            <div className="relative hidden lg:flex flex-col justify-between p-12 text-white">
                <img
                    src={hero}
                    alt="Doctor"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-blue-900/95 to-teal-700/90"></div>


                <div className="relative z-10 flex items-center gap-3">
                    <img src={logo} alt="MediTrack" className="w-10 h-10" />
                    <div>
                        <h1 className="text-xl font-bold">MediTrack</h1>
                        <p className="text-sm text-blue-100">
                            Medical Management System
                        </p>
                    </div>
                </div>


                <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl font-bold leading-tight mb-4">
                        Your Health,
                        <br /> Our Priority
                    </h2>
                    <p className="text-blue-100 text-lg">
                        Book appointments, track your health journey, and connect with top
                        medical professionals — all in one place.
                    </p>
                </div>


                <div className="relative z-10 flex gap-6">
                    <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-4">
                        <h3 className="text-2xl font-bold">500+</h3>
                        <p className="text-sm text-blue-100">Doctors</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-4">
                        <h3 className="text-2xl font-bold">10K+</h3>
                        <p className="text-sm text-blue-100">Patients</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-4">
                        <h3 className="text-2xl font-bold">15+</h3>
                        <p className="text-sm text-blue-100">Departments</p>
                    </div>
                </div>

                <p className="relative z-10 text-sm text-blue-200">
                    © 2024 MediTrack. All rights reserved.
                </p>
            </div>


            <div className="flex items-center justify-center bg-white px-6">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-1">Create account</h2>
                    <p className="text-gray-500 mb-6">
                        Join MediTrack to manage your health
                    </p>


                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                        <Link
                            to="/login"
                            className="flex-1 py-2 text-center text-gray-500"
                        >
                            Sign In
                        </Link>
                        <button className="flex-1 py-2 rounded-lg bg-white font-semibold shadow">
                            Register
                        </button>
                    </div>


                    <form onSubmit={submit} className="space-y-4">

                        <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    name="name"
                                    placeholder="Dr. John Smith"
                                    className="w-full pl-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>


                        <div>
                            <label className="text-sm font-medium">Email Address</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>


                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <Eye className="absolute right-3 top-3 w-5 h-5 text-gray-400 cursor-pointer" />
                            </div>
                        </div>


                        <div>
                            <label className="text-sm font-medium">I am a…</label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div
                                    onClick={() => setRole("patient")}
                                    className={`p-5 rounded-xl border text-center cursor-pointer ${role === "patient"
                                        ? "border-teal-500 bg-teal-50"
                                        : "border-gray-300"
                                        }`}
                                >
                                    <User className="mx-auto mb-2 text-teal-600" />
                                    <p className="font-semibold">Patient</p>
                                    <p className="text-xs text-gray-500">
                                        Book appointments
                                    </p>
                                </div>

                                <div
                                    onClick={() => setRole("doctor")}
                                    className={`p-5 rounded-xl border text-center cursor-pointer ${role === "doctor"
                                        ? "border-teal-500 bg-teal-50"
                                        : "border-gray-300"
                                        }`}
                                >
                                    <Stethoscope className="mx-auto mb-2 text-teal-600" />
                                    <p className="font-semibold">Doctor</p>
                                    <p className="text-xs text-gray-500">
                                        Manage appointments
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-2 bg-linear-to-r from-blue-900 to-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:opacity-95">
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
