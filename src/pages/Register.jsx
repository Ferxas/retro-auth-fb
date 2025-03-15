import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isAdult = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    return age > 18 || (age === 18 && today.getMonth() >= birth.getMonth() && today.getDate() >= birth.getDate());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { username, firstName, lastName, email, password, birthDate } = formData;

    if (!username || !firstName || !lastName || !email || !password || !birthDate) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if (!isAdult(birthDate)) {
      setError("Debes ser mayor de 18 años para registrarte");
      setLoading(false);
      return;
    }

    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      setError("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="nes-container is-dark with-title p-6 w-full max-w-md">
        <h2 className="title text-center">📝 Crear Cuenta</h2>

        {/* Mensaje de error */}
        {error && (
          <div className="nes-container is-error text-center p-3 my-3">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <label className="nes-text">Usuario</label>
          <input
            type="text"
            name="username"
            className="nes-input text-black"
            placeholder="Elige un nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label className="nes-text">Nombre</label>
          <input
            type="text"
            name="firstName"
            className="nes-input text-black"
            placeholder="Ingresa tu nombre"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label className="nes-text">Apellidos</label>
          <input
            type="text"
            name="lastName"
            className="nes-input text-black"
            placeholder="Ingresa tus apellidos"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label className="nes-text">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="nes-input text-black"
            placeholder="Tu correo"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="nes-text">Fecha de Nacimiento</label>
          <input
            type="date"
            name="birthDate"
            className="nes-input text-black"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />

          <label className="nes-text">Contraseña</label>
          <input
            type="password"
            name="password"
            className="nes-input text-black"
            placeholder="Crea una contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className={`nes-btn is-success ${loading ? "is-disabled" : ""}`}
            disabled={loading}
          >
            {loading ? "Registrando..." : "✅ Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;