import { Link } from "react-router-dom";

function ProductCard({ product, className }) {
  return (
    <div className={className}>
      <div className="card product-card mb-4 position-relative">
        <div className={product.quantity === 0 ? "product-not-available" : ""}>
          <Link to={`/produit/${product.slug}`} className="d-block">
            <img className="object-fit w-100 rounded-top" src={product.images[0]} style={{ height: "400px" }} />
          </Link>
          <div className="card-body">
            <h5 className="card-title text-left"><Link className="link-reset" to={`/produit/${product.slug}`}>{product.title}</Link></h5>
            <div className="fs-5 mb-1"><strong>{product.price}€</strong></div>
            <div>
              {product.colors.map(color => {
                return (
                  <div key={color._id} className="dot" style={{ background: color.value, }}></div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProductCard;