import Page from "../components/Page";
import ProductCard from "../components/ProductCard";
import { config } from "../config/config";
import useFetch from "../hooks/useFetch";

function Products() {
  const [isLoading, lastProducts] = useFetch(`${config.BASE_URL}/api/products`)

  return (
    <Page pageName="productsPage">
      <div className="container">
        <h1 className="text-center">Les produits</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 align-items-stretch mt-3">
          {lastProducts.map((product) =>
            <ProductCard className="col d-flex align-items-stretch" product={product} key={product._id} />)}
        </div>
      </div>
    </Page>
  )
}

export default Products;
