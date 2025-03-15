import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

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
  };

  return (
    <div className="nes-container with-title m-5">
      <h2 className="title text-center">🛒 Carrito de Compras</h2>

      {cart.length > 0 ? (
        <>
          <ul className="nes-container is-dark p-5 flex flex-col gap-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="nes-container is-rounded is-dark p-4 flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="nes-avatar is-large transition-transform transform hover:scale-105"
                />
                <div className="flex-grow">
                  <h3>{item.name}</h3>
                  <p className="nes-text is-success text-lg">
                    ${item.price} x {item.quantity} ={" "}
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                  <p
                    className={`nes-text ${
                      item.stock >= item.quantity ? "is-primary" : "is-error"
                    }`}
                  >
                    {item.stock >= item.quantity
                      ? `Stock disponible: ${item.stock}`
                      : "Stock insuficiente"}
                  </p>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      className="nes-btn is-warning"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      ➖
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          Math.min(item.stock, parseInt(e.target.value) || 1)
                        )
                      }
                      className="nes-input w-16 text-center text-black"
                    />
                    <button
                      className="nes-btn is-success"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.min(item.stock, item.quantity + 1)
                        )
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      ➕
                    </button>
                  </div>

                  {/* Botón para eliminar */}
                  <button
                    className="nes-btn is-error mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ❌ Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Resumen del carrito */}
          <div className="text-center mt-5">
            <p className="nes-text is-warning text-lg font-bold">
              Total: ${total.toFixed(2)}
            </p>
            <button className="nes-btn is-primary mt-4" onClick={handleCheckout}>
              ✅ Finalizar compra
            </button>
            <button className="nes-btn is-error ml-4 mt-4" onClick={clearCart}>
              🗑️ Vaciar carrito
            </button>
          </div>
        </>
      ) : (
        <p className="nes-text is-error text-center mt-5">
          🛒 No hay productos en el carrito.
        </p>
      )}
    </div>
  );
};

export default Cart;