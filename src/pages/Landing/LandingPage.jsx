import Hero from "../../components/landing/Hero/Hero";
import HealthcareServices from "../../components/landing/HealthcareServices/HealthcareServices";
import Ecosystem from "../../components/landing/Ecosystem/Ecosystem";
import WhyChooseUs from "../../components/landing/WhyChooseUs/WhyChooseUs";
import Statistics from "../../components/landing/Statistics/Statistics";
import Testimonials from "../../components/landing/Testimonials/Testimonials";
import CTA from "../../components/landing/CTA/CTA";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HealthcareServices />
        <Ecosystem />
        <WhyChooseUs />
        <Statistics />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
