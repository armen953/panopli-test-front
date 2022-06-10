import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartProduct from "../components/CartProduct";
import Page from "../components/Page"
import { resetState } from "../redux/cartReducer";

function Checkout() {
  const products = useSelector((state) => state.cart.products);
  const nbElementInCart = useSelector((state) => state.cart.nbElementInCart);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartTotal = useMemo(function () {
    let sum = 0
    products.forEach(product => {
      sum += product.price * product.selectedQuantity
    });
    return sum;
  }, [products]);

  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    address: '',
    address2: '',
    country: '',
    zip: ''
  });

  const [paymentData, setPaymentData] = useState({
    name: '',
    number: '',
    expiration: '',
    cvv: ''
  });

  /**
   * Simple data validation
   */
  const validation = () => {
    for (const item of Object.entries(addressData)) {
      console.log(item['1'])
      if (item['1'] === '') {
        return true;
      }
    }
    for (const item of Object.entries(paymentData)) {
      console.log(item['1'])
      if (item['1'] === '') {
        return true;
      }
    }
    return false;
  }

  const handleAddressChange = (e) => {
    const name = e.target.name;
    setAddressData({
      ...addressData,
      [name]: e.target.value
    })
  }

  const handlePaymentChange = (e) => {
    const name = e.target.name;
    setPaymentData({
      ...paymentData,
      [name]: e.target.value
    })
  }


  const handleCheckout = async (e) => {
    e.preventDefault()
    setIsSubmiting(true)

    const isMissingRequiredData = validation()
    if (isMissingRequiredData) {
      toast.error(`Les champs avec le * obligatoires`)
      setIsSubmiting(false)
      return;
    }

    const data = {
      products: products,
      addressInfo: addressData,
      paymentData: paymentData
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch('http://127.0.0.1:8080/api/orders', requestOptions)
      const resData = await response.json();
      setIsSubmiting(false)
      if (response.ok) {
        toast.success("Votre commande a bien été enregistrée");
        dispatch(resetState())
        navigate("/Success", { state: { orderId: resData._id} });
      } else {
        toast.error(`Une erreur est survenue lors de la commande: ${resData.error}`)
      }
    } catch (error) {
      setIsSubmiting(false)
      toast.error(`Une erreur est survenue lors de la commande:`)
    }
  }

  return (
    <Page pageName="checkoutPage">
      <div className="container">
        <div className="card">
          <div className="card-body">

            <div className="row">
              <div className="col-lg-12 col-xl-6 col-xxl-8">
                <h3>Adresse de facturation</h3>
                <form>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">Prénom <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="firstName" id="firstName" placeholder="John" value={addressData.firstName} onChange={handleAddressChange} required />
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">Nom <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Doe" value={addressData.lastName} onChange={handleAddressChange} required />
                    </div>

                    <div className="col-12">
                      <label htmlFor="username" className="form-label">Nom utilisateur <span className="text-muted">(*)</span></label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input type="text" className="form-control" name="username" id="username" placeholder="johnDoe2" value={addressData.username} onChange={handleAddressChange} required />
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email <span className="text-muted">(*)</span></label>
                      <input type="email" className="form-control" name="email" id="email" placeholder="john.doe@example.com" value={addressData.email} onChange={handleAddressChange} required />
                    </div>

                    <div className="col-12">
                      <label htmlFor="address" className="form-label">Adresse <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="address" id="address" placeholder="" value={addressData.address} onChange={handleAddressChange} required />

                    </div>

                    <div className="col-12">
                      <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="address2" id="address2" placeholder="" value={addressData.address2} onChange={handleAddressChange} required />
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="country" className="form-label">Country <span className="text-muted">(*)</span></label>
                      <select className="form-select" name="country" id="country" value={addressData.country} onChange={handleAddressChange} required>
                        <option>Choisir ...</option>
                        <option value="France">France</option>
                        <option value="Allemagne" >Allemagne</option>
                        <option value="Belgique">Belgique</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="zip" className="form-label">Code postal <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="zip" id="zip" placeholder="" value={addressData.zip} onChange={handleAddressChange} required />
                    </div>
                  </div>
                  <hr className="my-4" />

                  <h4 className="mb-3">Paiment</h4>
                  <div className="row gy-3">
                    <div className="col-md-6" >
                      <label htmlFor="cc-name" className="form-label">Titulaire <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="name" id="cc-name" placeholder="Nom Prénom" value={paymentData.name} onChange={handlePaymentChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cc-number" className="form-label">Numéro de la carte <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="number" id="cc-number" placeholder="**** **** **** ****" value={paymentData.number} onChange={handlePaymentChange} required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="cc-expiration" className="form-label">Date d'expiration <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="expiration" id="cc-expiration" placeholder="MM/AA" value={paymentData.expiration} onChange={handlePaymentChange} required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="cc-cvv" className="form-label">Cryptogramme <span className="text-muted">(*)</span></label>
                      <input type="text" className="form-control" name="cvv" id="cc-cvv" placeholder="xxx" value={paymentData.cvv} onChange={handlePaymentChange} required />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    onClick={handleCheckout}
                    disabled={(products.length === 0 || isSubmiting) ? true : false}
                    className="w-100 btn btn-primary"
                    type="submit"
                  >
                    {isSubmiting && <span s className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    <span>Valider ma commande {cartTotal} €</span>
                  </button>
                </form>
              </div>
              <div className="col-lg-12 col-xl-6  col-xxl-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-primary">Votre panier</span>
                  <span className="badge bg-primary rounded-pill">{nbElementInCart}</span>
                </h4>

                {products.map(product => <CartProduct key={product._id + product.size + product.color._id} product={product} />)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Checkout;
