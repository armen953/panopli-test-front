import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CartProduct from "../components/CartProduct";
import Page from "../components/Page";
import { config } from "../config/config";

function Order() {

  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleOrderId = (e) => {
    console.log(e.target.value);
    setOrderId(e.target.value)
  }

  const handleClick = async (e) => {
    setIsLoading(true)
    let response;
    try {
      response = await fetch(`${config.BASE_URL}/api/orders/${orderId}`);
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setOrder(responseData)
      } else {
        toast.error("Une erreur est survenue lors de la recherche de la commande")
      }
      setIsLoading(false)
    } catch (error) {
      if (response.status === 404) {
        toast.info("Commande non trouvé")
      } else {
        toast.error("Une erreur est survenue lors de la recherche de la commande")
      }
      setIsLoading(false)
    }

  }

  return (
    <Page pageName="orderPage">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="form-floating mb-3">
              <input type="orderId" className="form-control" id="floatingInput" placeholder="5162516756752765176" value={orderId} onChange={handleOrderId} />
              <label htmlFor="floatingInput">Numéro de la commande</label>
            </div>
            <button disabled={isLoading} className="btn btn-primary" onClick={handleClick}>Chercher</button>
          </div>
        </div>
        {order !== null &&
          <div className="card mt-3">
            <div className="card-body">
              <div><strong>Numero de la commande :</strong> {order._id}</div>
              <div><strong>Mmontant :</strong> {order.amount}€</div>
              <div><strong>Email:</strong> {order.address.email}</div>
              <div><strong>Nom utilisateur:</strong> {order.address.username}</div>

              <div>
                <strong>Adresse de livraison:</strong>
                <div style={{ marginLeft: "1rem" }}>
                  <div>
                    {order.address.firstName} {order.address.lastName}
                  </div>
                  <div>
                    {order.address.address} {order.address.address2}
                  </div>
                  <div>
                    {order.address.country} {order.address.lastName}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                {order.products.map(product => {
                  return <CartProduct product={product} showQuantity={false} key={product._id + product.size + product.color._id} />
                })}
              </div>
            </div>
          </div>}
      </div>
    </Page>
  )
}

export default Order;
