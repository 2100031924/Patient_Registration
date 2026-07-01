import {
  LuUser,
  LuDna,
  LuPill,
  LuFolderHeart,
  LuShieldPlus,
  LuHeartPulse,
  LuArrowRight,
} from "react-icons/lu";
import "./HealthcareServices.css";

const services = [
  {
    id: "doctor-consultation",
    icon: LuUser,
    title: "Doctor Consultation",
    desc: "Book appointments with verified doctors across specialities.",
  },
  {
    id: "lab-tests",
    icon: LuDna,
    title: "Lab Tests",
    desc: "Book lab tests at Home with certified laboratories.",
  },
  {
    id: "online-pharmacy",
    icon: LuPill,
    title: "Online Pharmacy",
    desc: "Order medicines online and get them delivered to your doorstep.",
  },
  {
    id: "health-records",
    icon: LuFolderHeart,
    title: "Health Records",
    desc: "Access prescriptions, reports and medical history securely.",
  },
  {
    id: "insurance-claims",
    icon: LuShieldPlus,
    title: "Insurance Claims",
    desc: "Verify coverage, file claims and track approvals.",
  },
  {
    id: "remote-monitoring",
    icon: LuHeartPulse,
    title: "Remote Monitoring",
    desc: "Track your vitals and stay connected with your care team.",
  },
];

export default function HealthcareServices() {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__heading">
          <span className="services__label">
            EVERYTHING YOU NEED FOR BETTER HEALTHCARE
          </span>
          <h2>
            Access care, diagnostics, medicines, records, insurance, and
            AI-powered health services from a{" "}
            <span>single platform.</span>
          </h2>
        </div>

        <div className="services__grid">
          {services.map(({ id, icon: Icon, title, desc }) => (
            <article className="service" key={id}>
              <div className="service__icon">
                <Icon />
              </div>

              <div className="service__content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>

              <button className="service__arrow" aria-label={`Learn more about ${title}`}>
                <LuArrowRight />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
