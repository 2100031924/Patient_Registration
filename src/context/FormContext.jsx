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

const STORAGE_KEY = "patient_onboarding_form_v1";

/* Keys holding File objects — cannot be JSON-serialized, kept in memory only */
const NON_SERIALIZABLE_KEYS = ["insuranceFiles", "healthRecords"];

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

  /* ── Medical History ── */
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
  patientId: "",
  password: "",
  confirmPassword: "",
};

const initialCompletedSteps = {
  "/": false,
  "/additional-info": false,
  "/medical-history": false,
  "/insurance": false,
  "/health-records": false,
  "/review": false,
};

/* Remove File-bearing keys before persisting */
function toSerializable(formData) {
  const clone = { ...formData };
  NON_SERIALIZABLE_KEYS.forEach((k) => {
    clone[k] = []; // do not persist File objects
  });
  return clone;
}

/* Read + merge persisted state once, synchronously, on first render */
function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        formData: initialState,
        completedSteps: initialCompletedSteps,
        isSubmitted: false,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      // merge so newly added fields keep their defaults
      formData: { ...initialState, ...(parsed.formData || {}) },
      completedSteps: { ...initialCompletedSteps, ...(parsed.completedSteps || {}) },
      isSubmitted: Boolean(parsed.isSubmitted),
    };
  } catch {
    return {
      formData: initialState,
      completedSteps: initialCompletedSteps,
      isSubmitted: false,
    };
  }
}

export function FormProvider({ children }) {
  const location = useLocation();

  /* Lazy initializers rehydrate from localStorage on mount */
  const [formData, setFormData] = useState(() => loadPersisted().formData);
  const [isSubmitted, setIsSubmitted] = useState(() => loadPersisted().isSubmitted);
  const [completedSteps, setCompletedSteps] = useState(() => loadPersisted().completedSteps);

  const [currentStep, setCurrentStep] = useState(() => {
    const idx = steps.findIndex((s) => s.path === location.pathname);
    return idx >= 0 ? idx : 0;
  });

  /* Persist whenever serializable state changes */
  useEffect(() => {
    try {
      const payload = {
        formData: toSerializable(formData),
        completedSteps,
        isSubmitted,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage full or unavailable — ignore, keep working in memory */
    }
  }, [formData, completedSteps, isSubmitted]);

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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
    setFormData(initialState);
    setIsSubmitted(false);
    setCompletedSteps(initialCompletedSteps);
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
