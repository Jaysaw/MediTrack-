import { CalendarDays, Clock, User, Stethoscope } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AppointmentCard({ appointment, onUpdateStatus }) {
    const { user } = useAuth();

    const statusStyles = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition mb-4">

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                        {appointment.department}
                    </h3>


                    {user.role === "doctor" ? (
                        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <User className="w-4 h-4" />
                            Patient: {appointment.patient?.name}
                        </p>
                    ) : (
                        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Stethoscope className="w-4 h-4" />
                            Doctor: {appointment.doctor?.name}
                        </p>
                    )}
                </div>


                <span
                    className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${statusStyles[appointment.status]}`}
                >
                    {appointment.status}
                </span>
            </div>


            <div className="flex gap-6 mt-4 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-blue-600" />
                    {appointment.date}
                </p>

                <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {appointment.timeSlot}
                </p>
            </div>


            {user.role === "doctor" && appointment.status === "pending" && (
                <div className="mt-5 flex gap-3">
                    <button
                        onClick={() => onUpdateStatus(appointment._id, "approved")}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
                    >
                        Approve
                    </button>

                    <button
                        onClick={() => onUpdateStatus(appointment._id, "rejected")}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
}