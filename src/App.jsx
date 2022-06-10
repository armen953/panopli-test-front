import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Products from "./pages/Products";
import Product from './pages/Product';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Products />} />
        <Route path="/produit/:slug" element={<Product />} />
        <Route path="/commande" element={<Order />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <ToastContainer autoClose={4000} />
      <Footer />
    </>
  );
}

export default App;
