import "./InspirationSection.css";

const inspirationData = [
  { id: 1, name: "Sandton City Hotel", distance: "53 km away", image: "/images/sandton.jpg" },
  { id: 2, name: "Joburg City Hotel", distance: "168 km away", image: "/images/joburg.jpg" },
  { id: 3, name: "Woodmead Hotel", distance: "30 miles away", image: "/images/woodmead.jpg" },
  { id: 4, name: "Hyde Park Hotel", distance: "34 km away", image: "/images/hydepark.jpg" },
];

function InspirationSection() {
  return (
    <section className="inspiration-section">
      <h2>Inspiration for your next trip</h2>
      <div className="inspiration-grid">
        {inspirationData.map((item) => (
          <div key={item.id} className="inspiration-card">
            <img src={item.image} alt={item.name} />
            <div className="inspiration-card-info">
              <p className="inspiration-card-name">{item.name}</p>
              <p className="inspiration-card-distance">{item.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InspirationSection;