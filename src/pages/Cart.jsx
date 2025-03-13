import { useNavigate } from 'react-router-dom';
import {useCart} from '../context/CartContext'
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      alert("Debes iniciar sesión para completar la compra");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  }

  return (
    <div className="nes-container with-title is-centered m-5">
      <h2 className="title">Carrito de compras</h2>
      {
        cart.length > 0 ? (
          <>
            <ul className="nes-list is-disc">
              {
                cart.map((item) => (
                  <li key={item.id} className="nes-text">
                    {item.name} x {item.quantity} = ${item.price * item.quantity}
                    <button
                      className="nes-btn is-error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remover
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </li>
                ))
              }
            </ul>
            <p className='nes-text is-warning text-lg font-bold'>
              Total: ${total}
            </p>
            <button className='nes-btn is-primary mt-4' onClick={handleCheckout}>
              Finalizar compra
            </button>
            <button
              className="nes-btn is-error"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          </>
        ) : (
          <p>No hay productos en el carrito</p>
        )
      }
    </div>
  )
}

export default Cart