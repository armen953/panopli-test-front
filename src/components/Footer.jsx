import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-3 my-4 footer mt-auto py-3 bg-light">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Accueil</Link></li>
        <li className="nav-item"><Link to="/produits" className="nav-link px-2 text-muted">Produits</Link></li>
        <li className="nav-item"><Link to="/commande" className="nav-link px-2 text-muted">Suivi de commande</Link></li>
      </ul>
      <p className="text-center text-muted">© 2022 Panopli e-commerce</p>
    </footer>
  )
}

export default Footer;