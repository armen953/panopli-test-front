import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useQuantity from "../hooks/useQuantity";
import { changeProductQuantityIn, removeProduct } from "../redux/cartReducer";

function CartProduct({ product, showQuantity=true }) {
  const [selectedQuantity, setSelectedQuantity] = useQuantity(product.selectedQuantity, 1, product.quantity)
  const dispatch = useDispatch();

  const handleProductRemoveFromCart = () => {
    dispatch(removeProduct({
      ...product
    }));
    toast.info("Produit retiré du panier")
  }

  const handleProductQuantityChange = (type) => {
    let quantityChange = 0
    if (type === "inc") {
      setSelectedQuantity("inc");
      quantityChange = 1;
    } else {
      setSelectedQuantity("dec");
      quantityChange = -1;
    }

    if (selectedQuantity+quantityChange === 0) {
      handleProductRemoveFromCart();
    } else {
      dispatch(changeProductQuantityIn({
        product,
        quantityChange
      }));
    }
  }

  return (
    <div id={product._id + product.size + product.color._id} className="cart-item">
      <img className="cart-product-image" src={product.images[0]} alt={product.title} height="140" width="140" />
      <div className="cart-product-details">
        <Link to={`/produit/${product.slug}`} className="cart-product-link">
          <span className="cart-product-title">{product.title}</span>
        </Link>
        {showQuantity && <div className="cart-remove-product">
          <button className="cart-remove-button" onClick={handleProductRemoveFromCart}>
            <svg className="cart-remove-button-icon bi bi-x" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>}
        <div className="d-flex align-items-center">
          <div className="cart-product-color me-3">
            <div className="product-color active" style={{ backgroundColor: product.color.value, cursor: "auto", marginLeft: "0", height: "30px", width: "30px" }}></div>
            <span>{product.color.name}</span>
          </div>
          <div className="cart-product-size">
            Taille: <span>{product.size}</span>
          </div>
        </div>
       { showQuantity&&
       <div className="card-product-price-quantity">
          <div className="cart-price-calculation">
            <span className="cart-product-price-quantity-mult">{product.price}&nbsp;€&nbsp;x&nbsp;{selectedQuantity}</span>
            <span className="cart-product-total">{product.price * selectedQuantity}&nbsp;€</span>
          </div>
          <div className="card-product-quantity">
            <button onClick={() => handleProductQuantityChange("dec")}>-</button>
            <div className="count">{selectedQuantity}</div>
            <button onClick={() => handleProductQuantityChange("inc")} disabled={product.quantity === selectedQuantity}>+</button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default CartProduct;