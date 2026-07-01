export function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatPhone(phone) {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

export function formatBloodPressure(bp) {
  if (!bp) return "";
  return `${bp} mmHg`;
}

export function formatBloodSugar(bs) {
  if (!bs) return "";
  return `${bs} mg/dL`;
}

export function formatHeight(value, unit = "cm") {
  if (!value) return "";
  return `${value} ${unit}`;
}

export function formatWeight(value, unit = "kg") {
  if (!value) return "";
  return `${value} ${unit}`;
}

export function toTitleCase(str) {
  if (!str) return "";
  return str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
