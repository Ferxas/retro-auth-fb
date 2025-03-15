import { useState } from "react";
import { loginUser, loginGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGoogle = async () => {
    setLoading(true);
    try {
      await loginGoogle();
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="nes-container is-dark with-title p-6 w-full max-w-md">
        <h2 className="title text-center">🔑 Iniciar Sesión</h2>

        {/* Mensaje de error */}
        {error && (
          <div className="nes-container is-error text-center p-3 my-3">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Campo de correo */}
          <label className="nes-text">Correo electrónico</label>
          <input
            type="email"
            className="nes-input text-black"
            placeholder="Ingresa tu correo"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Campo de contraseña con botón para mostrar/ocultar */}
          <label className="nes-text">Contraseña</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              className="nes-input w-full text-black"
              placeholder="Ingresa tu contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="nes-btn is-primary ml-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className={`nes-btn is-success ${loading ? "is-disabled" : ""}`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "🔓 Iniciar Sesión"}
          </button>

          {/* Botón de inicio de sesión con Google */}
          <button
            type="button"
            className={`nes-btn is-error ${loading ? "is-disabled" : ""}`}
            onClick={handleLoginGoogle}
            disabled={loading}
          >
            {loading ? "Cargando..." : "🔵 Iniciar sesión con Google"}
          </button>

          {/* Enlace para recuperar contraseña */}
          {/* <p className="text-center mt-3">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/forgot-password" className="nes-text is-primary">
              Recuperarla aquí
            </a>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;