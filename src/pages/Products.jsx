import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData();
  }, [])
  return (
    <div className='nes-container with-title m-5'>
      <h2 className='title'>Catálogo de Consolas Retro</h2>
      <div className='nest-container is-dark flex flex-wrap gap-4'>
        {products.length > 0 ? products.map(product => (
          <div key={product.id} className='nes-container is-rounded is-dark'>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <Link to={`/product/${product.id}`} className='nes-btn is-primary'>Ver detalles</Link>
          </div>
        )) : <p className='nes-text is-error'>Cargando productos...</p>}
      </div>
    </div>
  )
}

export default Products