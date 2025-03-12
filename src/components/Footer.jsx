import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white p-4 text-center mt-4'>
      <p>&copy; {new Date().getFullYear()} Mi tienda - Todos los derechos reservados</p>
    </footer>
  )
}

export default Footer