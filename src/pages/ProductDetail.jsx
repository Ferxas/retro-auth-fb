import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from "../services/firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {useCart} from '../context/CartContext'


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
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error(`No such document with id ${id}`);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error.message);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Añadiendo al carrito");
      addToCart(product);
    }
  }

  return product ? (
    <div className='nes-container with-title m-5'>
      <h2 className='title'>{product.name}</h2>
      <img className='nes-avatar is-large' src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button className='nes-btn is-success' onClick={handleAddToCart}>Añadir al carrito</button>
    </div>
  ) : <p className='nest-text is-error'>Cargando producto...</p>
}

export default ProductDetail