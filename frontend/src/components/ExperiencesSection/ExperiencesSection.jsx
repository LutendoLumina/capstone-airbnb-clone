import "./ExperiencesSection.css";

function ExperiencesSection() {
  return (
    <section className="experiences-section">
      <h2>Discover Airbnb Experiences</h2>
      <div className="experiences-grid">
        <div className="experience-card">
          <img src="/images/experiences-trip.jpg" alt="Things to do on your trip" />
          <div className="experience-card-info">
            <h3>Things to do on your trip</h3>
            <button>Experiences</button>
          </div>
        </div>
        <div className="experience-card">
          <img src="/images/experiences-home.jpg" alt="Things to do from home" />
          <div className="experience-card-info">
            <h3>Things to do from home</h3>
            <button>Online Experiences</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesSection;