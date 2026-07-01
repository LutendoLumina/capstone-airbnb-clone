import tripImg from "../../assets/exp-img.jpg";
import homeImg from "../../assets/mik.avif";
import "./ExperiencesSection.css";

function ExperiencesSection() {
  return (
    <section className="experiences_section">
      <h2>Discover Airbnb Experiences</h2>
      <div className="experiences_grid">
        {/* Card 1 */}
        <div className="experience_card">
          <img src={tripImg} alt="Things to do on your trip" />
          <div className="experience-card-info">
            <h3>Things to do <br></br> on your trip</h3>
            <button>Experiences</button>
          </div>
        </div>
        {/* Card 2 */}
        <div className="experience_card">
          <img src={homeImg} alt="Things to do from home" />
          <div className="experience-card-info">
            <h3>Things to do <br></br> from home</h3>
            <button>Online Experiences</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesSection;