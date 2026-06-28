import "./ShopSection.css";

function ShopSection() {
  return (
    <section className="shop-section">
      <div className="shop-content">
        <div className="shop-text">
          <h2>Shop Airbnb gift cards</h2>
          <button>Learn more</button>
        </div>
        <div className="shop-image">
          <img src="/images/gift-cards.jpg" alt="Airbnb gift cards" />
        </div>
      </div>
    </section>
  );
}

export default ShopSection;