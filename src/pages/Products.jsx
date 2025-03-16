import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importamos el contexto del carrito

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // Filtrar productos por búsqueda, categoría y precio
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedPrice !== "all") {
      if (selectedPrice === "low") filtered = filtered.filter((product) => product.price < 100);
      if (selectedPrice === "mid") filtered = filtered.filter((product) => product.price >= 100 && product.price < 300);
      if (selectedPrice === "high") filtered = filtered.filter((product) => product.price >= 300);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedPrice, products]);

  // Función para agregar producto al carrito
  const handleBuy = (product) => {
    addToCart(product);
    alert(`${product.name} ha sido agregado al carrito 🛒`);
  };

  return (
    <div className="nes-container with-title m-5">
      <h2 className="title text-center">Catálogo de Consolas Retro</h2>
      <p className="nes-text is-primary text-center">Revive la nostalgia con nuestras consolas clásicas.</p>

      {/* Barra de búsqueda */}
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="nes-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filtro por categoría */}
        <select className="nes-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">Todas las categorías</option>
          <option value="nintendo">Nintendo</option>
          <option value="sega">Sega</option>
          <option value="sony">Sony</option>
          <option value="microsoft">Microsoft</option>
        </select>

        {/* Filtro por precio */}
        <select className="nes-select" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
          <option value="all">Todos los precios</option>
          <option value="low">Menos de $100</option>
          <option value="mid">$100 - $300</option>
          <option value="high">Más de $300</option>
        </select>

        {/* Botón para limpiar filtros */}
        <button className="nes-btn is-warning" onClick={() => {
          setSearchTerm("");
          setSelectedCategory("all");
          setSelectedPrice("all");
        }}>
          Restablecer filtros
        </button>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="nes-container is-rounded is-dark p-4 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="nes-avatar is-large"
              />
              <h3 className="mt-3">{product.name}</h3>
              <p className="nes-text is-success text-lg">${product.price}</p>
              <div className="flex gap-3 mt-3">
                <Link to={`/product/${product.id}`} className="nes-btn is-primary">
                  Ver detalles
                </Link>
                <button className="nes-btn is-success" onClick={() => handleBuy(product)}>
                  Comprar 🛒
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="nes-text is-error text-center">No hay productos que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default Products;