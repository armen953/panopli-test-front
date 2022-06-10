import { useMemo } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import Page from "../components/Page"

function Cart() {
  const products = useSelector((state) => state.cart.products)

  const cartTotal = useMemo(function () {
    let sum = 0
    products.forEach(product => {
      sum += product.price * product.selectedQuantity
    });
    return sum;
  }, [products])

  const navigate = useNavigate();

  const navigateCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Page pageName="cartPage">
      <h1>Panier</h1>
      <div className="row">
        <div className="col-md-9">
          {products.map(product => {
            return (
              <CartProduct product={product} key={product._id + product.size + product.color._id} />
            )
          })}

        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span>Total:</span>  <span>{cartTotal} €</span>
              </div>
              <div className="text-center mt-4">
                <button 
                  onClick={navigateCheckout}
                  className="btn btn-primary btn-lg"
                  disabled={products.length !== 0 ? false : true}
                >
                  <strong>{products.length !== 0 ? "Valider mon panier" : "Ajouter un element au panier"}</strong>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Page>
  )
}

export default Cart;
