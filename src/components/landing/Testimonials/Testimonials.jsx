import { FaStar } from "react-icons/fa";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    title: "Fast & Reliable Lab Tests",
    quote: "“I scheduled my lab test online and received reports quickly.”",
    author: "John Smith",
    role: "Business Analyst",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    title: "Consult Online",
    quote: "“Convenient online consultations from home.”",
    author: "Vikram Rao",
    role: "Accountant",
    img: "",
    rating: 5,
    usePlaceholder: true,
  },
  {
    id: 3,
    title: "Insurance Support",
    quote: "“Smooth and hassle-free insurance support.”",
    author: "Kavya",
    role: "Teacher",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    title: "Hospital Care",
    quote: "“Quick booking and quality care.”",
    author: "Rahul Sharma",
    role: "Software Engineer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
];

const createRatingStars = (rating) => Array.from({ length: rating });

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        {/* Left Column: Heading & Description */}
        <div className="testimonials-left-col">
          <span className="testimonials-tagline">WHAT OUR PATIENTS SAY</span>
          <h2 className="testimonials-heading">Trusted by Millions</h2>
          <p className="testimonials-description">
            From booking to recovery, we make healthcare simple, accessible and personalized for you.
          </p>
        </div>

        {/* Right Column: Cards Grid/Track */}
        <div className="testimonials-track">
          {testimonialsData.map(({ id, title, quote, author, role, img, rating, usePlaceholder }) => (
            <div key={id} className="testimonial-card">
              
              {/* Rating Row */}
              <div className="card-rating-row">
                <div className="stars-wrapper">
                  {createRatingStars(rating).map((_, i) => (
                    <FaStar key={i} className="star-icon-filled" />
                  ))}
                </div>
                <span className="rating-value">5/5</span>
              </div>

              {/* Card Title & Quote */}
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-quote">{quote}</p>
              </div>

              {/* Profile Footer */}
              <div className="card-profile-footer">
                {usePlaceholder ? (
                  <div className="avatar-placeholder">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="fallback-svg"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={img}
                    alt={author}
                    className="profile-avatar"
                    draggable="false"
                  />
                )}
                <div className="profile-details">
                  <span className="profile-name">{author}</span>
                  <span className="profile-role">{role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
