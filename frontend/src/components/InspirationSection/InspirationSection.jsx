import sandtonImg from "../../assets/sandton.png";
import joburgImg from "../../assets/joburg.png";
import woodmeadImg from "../../assets/woodmead.png";
import hydeparkImg from "../../assets/hydepark.png";
import "./InspirationSection.css";

const inspirationData = [
  { id: 1, name: "Sandton City Hotel", distance: "53 km away", image: sandtonImg },
  { id: 2, name: "Joburg City Hotel", distance: "168 km away", image: joburgImg },
  { id: 3, name: "Woodmead Hotel", distance: "30 miles away", image: woodmeadImg },
  { id: 4, name: "Hyde Park Hotel", distance: "34 km away", image: hydeparkImg },
];

function InspirationSection() {
  return (
    <section className="inspiration_section">

      <h2>Inspiration for your next trip</h2>

      <div className="inspiration_grid">
        {inspirationData.map((item) => (
          <div key={item.id} className="inspiration_card">
            <img src={item.image} alt={item.name} />
            <div className="inspiration_card_info">
              <p className="inspiration_card_name">{item.name}</p>
              <p className="inspiration_card_distance">{item.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InspirationSection;