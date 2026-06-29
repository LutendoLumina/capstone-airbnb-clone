import giftImage from "../../assets/gift-cards.png";
import "./ShopSection.css";

function ShopSection() {
  return (
    <section className="shop_section">
      <div className="shop_content">
        <div className="shop_text">
          <h2>Shop Airbnb gift cards</h2>
          <button>Learn more</button>
        </div>
        <div className="shop_image">
          <img src={giftImage} alt="Airbnb gift cards" />
        </div>
      </div>
    </section>
  );
}

export default ShopSection;