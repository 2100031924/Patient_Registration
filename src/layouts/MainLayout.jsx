import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useForm, steps } from "../context/FormContext";
import "./MainLayout.css";
import { FiHeadphones, FiMenu } from "react-icons/fi";

const headerMeta = {
  "/": { title: "Personal Information", subtitle: "Add your basic information to complete your profile and personalize your healthcare journey." },
  "/additional-info": { title: "Additional Information", subtitle: "Enhance your profile with optional details for a more personalized healthcare journey." },
  "/medical-history": { title: "Medical History", subtitle: "Add information about your past treatments, medications, and health conditions." },
  "/insurance": { title: "Insurance Details", subtitle: "Add your insurance information for seamless coverage and claims processing." },
  "/health-records": { title: "Upload Health Records", subtitle: "Keep all your medical documents in one secure and convenient place." },
  "/review": { title: "Review & Complete", subtitle: "Configure your login credentials to securely manage your healthcare information." }
};

const MainLayout = () => {
  const location = useLocation();
  const { isSubmitted, currentStep } = useForm();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentMeta = headerMeta[location.pathname] || headerMeta["/"];
  const activeStepMeta = steps[currentStep] || steps[0];

  return (
    <div className="main-layout">
      <div className="sidebar-wrapper">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="main-content">
        {!isSubmitted && (
          <nav className="mobile-top-navbar">
            <div className="mobile-nav-left">
              <button
                type="button"
                className="mobile-menu-trigger"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <FiMenu />
              </button>
              <span className="mobile-app-brand">MediConnect</span>
            </div>
            <div className="mobile-nav-progress">
              <span className="mobile-pct-text">{activeStepMeta.percentage}% Done</span>
              <div className="mobile-mini-progress-track">
                <div className="mobile-mini-progress-fill" style={{ width: `${activeStepMeta.percentage}%` }} />
              </div>
            </div>
          </nav>
        )}

        {!isSubmitted && (
          <header className="global-header">
            <div className="header-left-title">
              <h1 className="page-main-title">{currentMeta.title}</h1>
              <p className="page-main-subtitle">{currentMeta.subtitle}</p>
            </div>
            <div className="help-box">
              <FiHeadphones className="help-icon" />
              <div className="help-text">
                <span className="help-lbl">Need Help?</span>
                <a href="#support" className="help-link">Contact Support</a>
              </div>
            </div>
          </header>
        )}

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
