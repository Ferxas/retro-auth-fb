import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const [username, setUsername] = useState(null);

  // Obtener nombre del usuario desde Firestore si no está en displayName
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        if (user.displayName) {
          setUsername(user.displayName);
        } else {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
        }
      }
    };
    fetchUsername();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const featuredProducts = data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setProducts(featuredProducts);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="nes-container with-title m-5">
      {/* Bienvenida personalizada */}
      {user ? (
        <div className="nes-container is-primary with-title p-4 text-center">
          <h2 className="title">🎮 ¡Bienvenido, {username || "Gamer"}! 🎮</h2>
          <p>Nos alegra verte en nuestra tienda retro.</p>
          {user.metadata?.creationTime && (
            <p className="nes-text is-success">
              Miembro desde: {new Date(user.metadata.creationTime).toLocaleDateString()}
            </p>
          )}
          <Link to="/products" className="nes-btn is-success mt-3">
            🔥 Explorar más consolas
          </Link>
        </div>
      ) : (
        <div className="nes-container is-warning with-title p-4 text-center">
          <h2 className="title">🕹️ ¡Bienvenido a Tienda Retro! 🕹️</h2>
          <p>Inicia sesión para ver nuestras ofertas exclusivas.</p>
          <Link to="/login" className="nes-btn is-primary mt-3">
            🔑 Iniciar Sesión
          </Link>
        </div>
      )}

      {/* Carrusel de productos destacados */}
      {products.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="mt-5"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="nes-container is-dark with-title p-5 text-center">
                <h2 className="title">{product.name}</h2>
                <img
                  src={product.image}
                  alt={product.name}
                  className="nes-avatar is-large mx-auto"
                />
                <p>{product.description}</p>
                <p className="nes-text is-success">${product.price}</p>
                <Link to={`/product/${product.id}`} className="nes-btn is-primary">
                  Ver Detalles
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="nes-text is-error">Cargando productos...</p>
      )}

      {/* Botón para ver más productos */}
      <div className="text-center mt-5">
        <Link to="/products" className="nes-btn is-success">
          Ver Más Consolas
        </Link>
      </div>
    </div>
  );
};

export default Home;
