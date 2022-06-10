import { Link } from "react-router-dom";
import { carouselItems } from "../data/homepageCarouselData";

function HomePageCarousel() {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
      {carouselItems.map((carouselItem, index) => 
        <button key={index} type="button" data-bs-target="#homeCarousel" data-bs-slide-to={index} className={`${index === 0 ? "active" : ""}`}  aria-label={`Slide ${index}`}></button>
      )}
      </div>
      <div className="carousel-inner" >
        {carouselItems.map(carouselItem => (
          <div className={`carousel-item h-100 ${carouselItem.id === 1 ? "active" : ""}`} key={carouselItem.id}>
            <div className="carousel-home-overlay h-100">
              <img className="carousel-home-img" width="100%" height="100%" src={carouselItem.image} />
            </div>
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Lorem, ipsum dolor</h1>
                <p>Ad magni quos fugit laborum magnam tempora vitae animi fuga reiciendis iste dolore</p>
                <p><Link to="/produits" className="btn btn-inverse btn-outline-light btn-lg" >Voir les produits</Link></p>
              </div>
            </div>
          </div>
        ))
        }
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default HomePageCarousel;