export function validateEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  if (!phone) return false;
  const clean = phone.replace(/\D/g, "");
  return clean.length === 10;
}

export function validatePassword(password) {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numberOrSymbol: /[\d!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  return {
    isValid: checks.length && checks.lowercase && checks.uppercase && checks.numberOrSymbol,
    checks,
  };
}

export function validateBloodPressure(bp) {
  if (!bp) return true;
  const regex = /^\d{2,3}\/\d{2,3}$/;
  if (!regex.test(bp.trim())) return "Use format: 120/80";
  const [sys, dia] = bp.split("/").map((n) => parseInt(n.trim(), 10));
  if (sys < 50 || sys > 250 || dia < 30 || dia > 150) return "Enter realistic values";
  return null;
}

export function validateRequired(value, fieldName = "This field") {
  if (!value || (typeof value === "string" && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}
