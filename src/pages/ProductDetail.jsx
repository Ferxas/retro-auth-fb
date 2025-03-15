import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("ID del producto no encontrado");
        return;
      }

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error(`No se encontró el producto con id ${id}`);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart({ id, ...product });
    } else {
      alert("Producto agotado");
    }
  };

  return product ? (
    <div className="flex justify-center items-center min-h-screen">
      <div className="nes-container is-dark with-title p-6 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl">
        <img
          className="nes-avatar is-large transition-transform transform hover:scale-105"
          src={product.image}
          alt={product.name}
        />
        <div className="text-center md:text-left">
          <h2 className="title">{product.name}</h2>
          <p className="nes-text is-primary">{product.description}</p>
          <p className="nes-text is-success text-lg font-bold">${product.price}</p>
          <p className={`nes-text ${product.stock > 0 ? "is-success" : "is-error"}`}>
            {product.stock > 0 ? `Stock disponible: ${product.stock}` : "Agotado"}
          </p>
          <button
            className={`nes-btn ${product.stock > 0 ? "is-success" : "is-disabled"} mt-4`}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Añadir al Carrito" : "No Disponible"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="nes-text is-error text-center mt-10">Cargando producto...</p>
  );
};

export default ProductDetail;