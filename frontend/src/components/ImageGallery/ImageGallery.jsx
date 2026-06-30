import "./ImageGallery.css";

function ImageGallery({ images }) {
  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <img src={images[0]} alt="Main" className="gallery-main-img" />
      </div>
      <div className="gallery-grid">
        {images.slice(1, 5).map((img, index) => (
          <div key={index} className="gallery-grid-item">
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;