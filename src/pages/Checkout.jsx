import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../services/orderService'
import { useNavigate } from 'react-router-dom'



const Checkout = () => {

    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const total = cart.reduce((sum, item) => sum + item.price + item.quantity, 0);

    useEffect(() => {
        console.log("Carrito en checkout", cart);
    }, [cart]);
 
    const handleCheckout = async () => {
        if (!user) {
            alert("Debes iniciar sesión para completar la compra!");
            return;
        }
        setLoading(true);
        try {
            const orderId = await createOrder(user.uid, cart, total);
            setOrderId(orderId);
            console.log("Orden realizada!");
            clearCart();
        } catch (error) {
            console.error("Falló la compra:", error.message);
        } finally {
            console.log("Finalizó");
            setLoading(false);
        }
    }


    if (orderId) {
        console.log("OrderID es true!");
        return (
            <div className='nes-container with-title m-5'>
                <h2 className='title'>¡Compra realizada!</h2>
                <p className='nes-text is-success'>Tu pedido ha sido registrado con el ID: <strong>{orderId}</strong></p>
                <button className='nes-btn is-primary mt-4' onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        )
    }

    console.log("Resumen de la compra mostrandose!");
    return (
        <div className='nes-container with-title m-5'>
            <h2 className='title'>Resumen de la compra</h2>
            {
                cart.lenght > 0 ? (
                    <>
                    <ul>
                        {cart.map((item) => {
                            <li key={item.id} className='nes-container is-dark p-3 my-3'>
                                <h3>{item.name}</h3>
                                <p className='nes-text is-success'>${item.price} x {item.quantity}</p>
                            </li>
                        })}
                    </ul>
                    <p className='nes-text is-warning text-lg font-bold'>Total: ${total}</p>
                    <button className='nes-btn is-success mt-4' onClick={handleCheckout} disabled={loading}>{loading ? "Procesando..." : "Confirmar compra"}</button>
                    </>
                ) : (
                    <>
                    <p className='nes-text is-error'>No hay productos en el carrito</p>
                    </>
                )
            } 
        </div>
    )
}
export default Checkout