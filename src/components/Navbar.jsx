import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {

  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className='nes-container is-dark with-title flex justify-between p-4'>
      <h2 className='title'>Tienda Retro</h2>
      <div>
        <Link to='/' className='nes-btn is-warning'>Inicio</Link>
        <Link to='/products' className='nes-btn primary mx-2'>Consolas</Link>
        <Link to='/cart' className='nes-btn is-success'>Carrito ({totalItems})</Link>
      </div>
    </nav>
  )
}

export default Navbar