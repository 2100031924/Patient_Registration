export const APP_NAME = "MediConnect";
export const APP_TAGLINE = "Healthcare Ecosystem";

export const STORAGE_KEYS = {
  FORM_DATA: "patient_onboarding_form_v1",
  TAKEN_IDS: "mediConnect_taken_ids",
  AUTH_TOKEN: "mediConnect_token",
  USER: "mediConnect_user",
  THEME: "mediConnect_theme",
};

export const STEPS = [
  { id: "personal", label: "Personal Details", path: "/", percentage: 10 },
  { id: "additional", label: "Additional Information", path: "/additional-info", percentage: 30 },
  { id: "medical", label: "Medical History", path: "/medical-history", percentage: 40 },
  { id: "insurance", label: "Insurance Information", path: "/insurance", percentage: 60 },
  { id: "health-records", label: "Health Records", path: "/health-records", percentage: 75 },
  { id: "review", label: "Review & Complete", path: "/review", percentage: 90 },
];

export const FILE_SIZE_LIMITS = {
  INSURANCE: 5,
  HEALTH_RECORDS: 20,
};

export const SUPPORTED_FILE_TYPES = ".pdf,.png,.jpg,.jpeg";
