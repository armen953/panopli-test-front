import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Navbar() {

  const nbElementInCart = useSelector((state) => state.cart.nbElementInCart)

  return (
    <header className="bg-white navbar sticky-top" style={{ boxShadow: "0px 4px 16px rgb(43 52 69 / 10%)", }}>
      <div className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-3
             border-bottom">
        <NavLink className="navbar-brand" to="/">Panopli e-commerce</NavLink>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><NavLink to="/" className="nav-link px-2 link-dark">Accueil</NavLink></li>
          <li><NavLink to="/produits" className="nav-link px-2 link-dark">Produits</NavLink></li>
          <li><NavLink to="/commande" className="nav-link px-2 link-dark">Suivi de commande</NavLink></li>
        </ul>

        <div className="col-md-3 text-end">
          <Link to="/panier" type="button" className="btn btn-primary position-relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            {nbElementInCart !== 0 &&
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {nbElementInCart}
                <span className="visually-hidden">elements dans le panier</span>
              </span>}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
