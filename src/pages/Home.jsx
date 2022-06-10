import HomePageCarousel from "../components/HomePageCarousel";
import Page from "../components/Page";
import ProductCard from "../components/ProductCard";
import { config } from "../config/config";
import useFetch from "../hooks/useFetch";

function Home() {
  const [isLoading, lastProducts] = useFetch(`${config.BASE_URL}/api/products?newProductLimit=6`)

  return (
    <Page pageName="homePage">
      <HomePageCarousel />
      <section className="text-center mt-5">
        <h1>Les derniers produits</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 align-items-stretch mt-3">
          {lastProducts.map((product) =>
            <ProductCard className="col d-flex align-items-stretch" product={product} key={product._id} />)}
        </div>
        <button className="btn btn-primary btn-lg mt-3 mb-2">Voir tous nos produits</button>
      </section>
    </Page>
  )
}

export default Home;
