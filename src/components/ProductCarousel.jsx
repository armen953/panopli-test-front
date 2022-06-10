function ProductCarousel({product, imageHeight}) {
  return (
    <div id="productCarousel"
    className="carousel carousel-dark slide"
    data-bs-ride="true"
    style={{ height: imageHeight }}
  >
    <div className="carousel-indicators">
      {product.images?.map((image, index) =>
        <button type="button" 
          data-bs-target="#productCarousel" 
          data-bs-slide-to={index} 
          className={`${index === 0 ? "active" : ""}`}
          aria-label={`Slide ${index}`} key={index}></button>
      )}
    </div>
    <div className="carousel-inner h-100">
      {product.images?.map((image, index) => {
        return (<div className={`carousel-item h-100 ${index === 0 ? "active" : ""}`} key={index}>
          <img src={image} className="d-block w-100 h-100 object-fit" alt={product.title} />
        </div>);
      })}
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default ProductCarousel;
