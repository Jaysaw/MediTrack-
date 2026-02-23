import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          user ? (
            user.role === "doctor" ? <DoctorDashboard /> : <PatientDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/book"
        element={user?.role === "patient" ? <BookAppointment /> : <Navigate to="/" />}
      />

      <Route
        path="/appointments"
        element={user ? <MyAppointments /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
