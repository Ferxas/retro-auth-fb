import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';

const Navbar = () => {

  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const handleLogout = async() => {
    await logout();
    navigate("/login");
  }


  return (
    <nav className='nes-container is-dark with-title flex justify-between p-4'>
      <h2 className='title'>Tienda Retro</h2>
      <div>
        <Link to='/' className='nes-btn is-warning'>Inicio</Link>
        <Link to='/products' className='nes-btn primary mx-2'>Consolas</Link>
        <Link to='/cart' className='nes-btn is-success'>Carrito ({totalItems})</Link>
        {
          !user ? (
            <>
            <Link to={"/login"} className='nes-btn is-error mx-2'>Login</Link>
            <Link to={"/register"} className='nes-btn is-success mx-2'>Register</Link>
            </>
          ) : (
            <>
            <button onClick={handleLogout} className='nes-btn is-error mx-2'>Logout</button>
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar