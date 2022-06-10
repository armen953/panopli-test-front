import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Page from "../components/Page";
import ProductCarousel from "../components/ProductCarousel";
import { config } from "../config/config";
import useFetch from "../hooks/useFetch";
import useQuantity from "../hooks/useQuantity";
import { addProduct } from "../redux/cartReducer";

function Product() {
	let { slug } = useParams();
	const [isLoading, product] = useFetch(`${config.BASE_URL}/api/products/${slug}`)

	const [hoverColor, setHoverColor] = useState(null);
	const [selectedQuantity, setSelectedQuantity] = useQuantity(1, 1, product.quantity)
	const [color, setColor] = useState({});
	const [size, setSize] = useState(null);
  const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoading) {
			// by default set the first color to the selected color
			setColor(product.colors[0])
		}
	}, [isLoading])

	const handleAddProductToCart = () => {
		dispatch(addProduct({
			...product, selectedQuantity, color, size
		}))
		toast.success('Produit ajouté au panier');
	}

	return (
		<Page pageName="productPage">
			<div className="card shadow-sm border-0">
				<div className="card-body p-lg-4">
					<div className="row">
						<div className="col-md-5">
							<ProductCarousel product={product} imageHeight="40vh" />
						</div>
						<div className="col-md-7">
							<h1 className="product-name">{product.title}</h1>

							<div className="product-description mb-3">{product.desc}</div>

							<div className="product-price fs-5 mb-3">{product.price} €</div>

							<div className="colors mb-3">
								<p className="color-name"> Couleur : <span className="color-label">{hoverColor ? hoverColor.name : color.name}</span></p>
								<div className="d-flex">
									{product.colors?.map(c => {
										return (
											<div key={c._id}
												onClick={() => setColor(c)}
												onMouseEnter={() => setHoverColor(c)}
												onMouseLeave={() => setHoverColor(null)}
												style={{ backgroundColor: c.value }}
												className={`product-color ${c._id === color._id ? "color-selected" : ""}`}
											></div>
										)
									})}
								</div>
							</div>

							<div className="sizes sizes-radio mb-3">
								<div>Sélectionner la taille</div>
								<div className="color-grid">
									{product.sizes?.map((size, index) => {
										return (
											<div key={index}>
												<input
													onChange={(e) => setSize(e.target.value)}
													type="radio"
													name="size"
													id={`size${index + size}`}
													value={size} />
												<label htmlFor={`size${index + size}`}>{size}</label>
											</div>
										)
									})}
								</div>
							</div>

							<div>Quantité:</div>
							<div className="card-product-quantity mb-3">
								<button onClick={() => setSelectedQuantity("dec")} disabled={selectedQuantity === 1}>-</button>
								<div className="count">{selectedQuantity}</div>
								<button onClick={() => setSelectedQuantity("inc")} disabled={product.quantity === selectedQuantity}>+</button>
							</div>

							<button
								className="btn btn-primary btn-lg"
								onClick={handleAddProductToCart}
								disabled={size ? false : true}
							>
								<strong>{size ? "Ajouter au panier" : "Choisir une taille"}</strong>
							</button>

							<span className="d-block small mt-3">Quantité disponible: {product.quantity}</span>
						</div>
					</div>
				</div>
			</div>

		</Page >
	)
}

export default Product;
