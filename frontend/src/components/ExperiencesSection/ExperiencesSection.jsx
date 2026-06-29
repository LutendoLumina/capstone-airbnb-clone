import tripImg from "../../assets/experiences-trip.png";
import homeImg from "../../assets/experiences-home.png";
import "./ExperiencesSection.css";

function ExperiencesSection() {
  return (
    <section className="experiences_section">
      <h2>Discover Airbnb Experiences</h2>
      <div className="experiences_grid">
        <div className="experience_card">
          <img src={tripImg} alt="Things to do on your trip" />
        </div>
        <div className="experience_card">
          <img src={homeImg} alt="Things to do from home" />
        </div>
      </div>
    </section>
  );
}

export default ExperiencesSection;