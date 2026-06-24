// ================================================================================
// FILE: src/context/FormContext.jsx
// ================================================================================
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FormContext = createContext(null);

/* ── Step Configuration ── */
export const steps = [
  { id: "personal",       label: "Personal Details",        path: "/",                 percentage: 10,  time: "1-2 Minutes" },
  { id: "additional",     label: "Additional Information",  path: "/additional-info",  percentage: 30,  time: "2-3 Minutes" },
  { id: "medical",        label: "Medical History",         path: "/medical-history",  percentage: 40,  time: "2-3 Minutes" },
  { id: "insurance",      label: "Insurance Information",   path: "/insurance",        percentage: 60,  time: "1-2 Minutes" },
  { id: "health-records", label: "Health Records",          path: "/health-records",   percentage: 75,  time: "2-3 Minutes" },
  { id: "review",         label: "Review & Complete",       path: "/review",           percentage: 90,  time: "2-3 Minutes" },
];

const initialState = {
  /* ── Personal Info ── */
  fullName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  state: "",
  city: "",
  email: "",
  phone: "",

  /* ── Additional Info ── */
  height: "",
  heightUnit: "cm",
  weight: "",
  weightUnit: "kg",
  bloodPressure: "",
  bloodSugar: "",
  physicalActivity: "",
  dietaryPreference: "",
  smoking: "",
  alcohol: "",
  emergencyRelationship: "",
  emergencyContact: "",

  /* ── Medical History  ── */
  allergies: "",
  allergiesTags: [],
  medications: "",
  conditions: "",
  conditionsTags: [],
  surgeries: "",

  /* ── Insurance ── */
  provider: "",
  policyNumber: "",
  insuranceFiles: [],

  /* ── Health Records ── */
  healthRecords: [],

  /* ── Review & Login Credentials ── */
  patientId: "7GH381",
  password: "",
  confirmPassword: "",
};

export function FormProvider({ children }) {
  const location = useLocation();

  const [formData, setFormData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({
    "/": false,
    "/additional-info": false,
    "/medical-history": false,
    "/insurance": false,
    "/health-records": false,
    "/review": false,
  });
  const [currentStep, setCurrentStep] = useState(() => {
    const idx = steps.findIndex((s) => s.path === location.pathname);
    return idx >= 0 ? idx : 0;
  });

  /* Keep currentStep in sync with URL changes */
  useEffect(() => {
    const idx = steps.findIndex((s) => s.path === location.pathname);
    if (idx >= 0) setCurrentStep(idx);
  }, [location.pathname]);

  const updateForm = useCallback((fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  const markStepComplete = useCallback((path, isComplete = true) => {
    setCompletedSteps((prev) => ({ ...prev, [path]: isComplete }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setIsSubmitted(false);
    setCompletedSteps({
      "/": false,
      "/additional-info": false,
      "/medical-history": false,
      "/insurance": false,
      "/health-records": false,
      "/review": false,
    });
  }, []);

  const goToStep = useCallback((index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  }, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        updateForm,
        resetForm,
        completedSteps,
        markStepComplete,
        currentStep,
        goToStep,
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useForm must be used within a FormProvider");
  return ctx;
}

export const useFormContext = useForm;

export default FormContext;
