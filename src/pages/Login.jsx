import { useState } from 'react';
import { loginUser, loginGoogle } from "../services/authService";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }

  const handleLoginGoogle = async () => {
    try {
      await loginGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Iniciar sesión</h2>
      {
        error && <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role='alert'>
          <p>{error}</p>
        </div>
      }
      <form onSubmit={handleLogin} className='flex flex-col items-center mt-10'>
        <input
          type='email'
          placeholder='Correo electrónico'
          required
          className='border-2 border-gray-500 p-2 m-2'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Contraseña'
          required
          className='border-2 border-gray-500 p-2 m-2'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded-md m-2'
        >
          Iniciar sesión
        </button>
        <button
          className='bg-red-500 text-white p-2 rounded-md m-2'
          onClick={handleLoginGoogle}
        >
          Iniciar sesión con Google
        </button>
      </form>
    </div>
  )
}

export default Login