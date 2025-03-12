import {createContext, useContext, useEffect, useState} from 'react'

const context = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        console.log("Contenido del carrito:", cart);

    }, [cart]);

    
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id)
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    }
    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <context.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </context.Provider>
    )
}

export const useCart = () => {
    return useContext(context)
}