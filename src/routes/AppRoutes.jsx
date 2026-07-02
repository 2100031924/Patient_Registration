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
import PatientLogin from "../pages/PatientLogin/PatientLogin";
import PatientSignup from "../pages/PatientSignup/PatientSignup";
import OtpVerification from "../pages/OtpVerification/OtpVerification";
import IdPasswordLogin from "../pages/IdPasswordLogin/IdPasswordLogin";
import MarketingPage from "../pages/Marketing/MarketingPage";

/*
 * All navbar marketing routes that should NOT hit 404.
 * The MarketingPage component handles dynamic content rendering
 * based on the URL path and shows a friendly "under development"
 * state for any recognized path without dedicated content yet.
 */
const MARKETING_ROUTES = [
  "/pricing",
  "/resources",
  "/solutions",
  "/solutions/telemedicine",
  "/solutions/ehr-integration",
  "/solutions/analytics-&-reporting",
  "/for-patients",
  "/for-patients/find-a-doctor",
  "/for-patients/patient-portal",
  "/for-patients/health-records",
  "/for-providers",
  "/for-providers/clinic-management",
  "/for-providers/provider-scheduling",
  "/for-providers/billing-&-claims",
  "/hospital-management",
  "/telemedicine",
  "/pharmacy-system",
  "/lab-management",
  "/health-insurance",
  "/appointments",
  "/remote-monitoring",
  "/ai-analytics",
  "/documentation",
  "/api-reference",
  "/integration",
  "/case-studies",
  "/about",
  "/careers",
  "/press",
  "/partners",
  "/blog",
  "/contact",
  "/forgot-password",
  "/consult",
];

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/patient-signup" element={<PatientSignup />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/id-password-login" element={<IdPasswordLogin />} />
      <Route element={<MainLayout />}>
        <Route path="/register" element={<PersonalInfo />} />
        <Route path="/register/additional-info" element={<AdditionalInfo />} />
        <Route path="/register/medical-history" element={<MedicalHistory />} />
        <Route path="/register/insurance" element={<Insurance />} />
        <Route path="/register/health-records" element={<HealthRecords />} />
        <Route path="/register/review" element={<Review />} />
      </Route>
      {/* Dynamic marketing pages for all navbar links */}
      {MARKETING_ROUTES.map((path) => (
        <Route key={path} path={path} element={<MarketingPage />} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
