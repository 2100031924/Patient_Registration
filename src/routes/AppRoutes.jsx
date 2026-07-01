import { Routes, Route } from "react-router-dom";
import PersonalInfo from "../pages/PersonalInfo/PersonalInfo";
import MainLayout from "../layouts/MainLayout";
import AdditionalInfo from "../pages/AdditionalInfo/AdditionalInfo";
import MedicalHistory from "../pages/MedicalHistory/MedicalHistory";
import Insurance from "../pages/Insurance/Insurance";
import HealthRecords from "../pages/HealthRecords/HealthRecords";
import Review from "../pages/Review/Review";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/register" element={<PersonalInfo />} />
        <Route path="/register/additional-info" element={<AdditionalInfo />} />
        <Route path="/register/medical-history" element={<MedicalHistory />} />
        <Route path="/register/insurance" element={<Insurance />} />
        <Route path="/register/health-records" element={<HealthRecords />} />
        <Route path="/register/review" element={<Review />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
