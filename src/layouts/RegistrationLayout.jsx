import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

export default function RegistrationLayout() {
  return (
    <div className="registration-layout">
      <Navbar />
      <main className="registration-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
