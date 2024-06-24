import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Login.css';

const Login = () => {
  const url = "https://laravel-production-fb9e.up.railway.app/api/login";
  const [email, setEmail] = useState('');
  const [contrasena, setcontrasena] = useState('');
  const [error, setError] = useState('');

  const handleVerificacionUsuario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { email, contrasena});
      console.log(response.data); // Maneja la respuesta del backend aquí
      if (response.data.role === 'admin') {
        window.location.href = '/Indexadm'; // Redirige al administrador a la página Indexadm
      } else if (response.data.role === 'vendedor') {
        window.location.href = '/Indexven'; // Redirige al vendedor a la página Indexven
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Datos  de inicio de sesión incorrectos');
    }
  };

  return (
    <div className="simula-body">
      <nav className="navbar" style={{ backgroundColor: '#cd3030' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html">
            <img src="./img/logo.png" alt="Logo" width={300} height={120} className="d-inline-block align-text-top" />
          </a>
        </div>
      </nav>
      <div className="container">
        <div id="container">
          <div className="form-container sign-up" />
          <div className="form-container sign-in">
            <form onSubmit={handleVerificacionUsuario}>
              <h1>Ingresar</h1>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="contraseña" value={contrasena} onChange={(e) => setcontrasena(e.target.value)} />
              <button type="submit">Ingresar</button>
              {error && <p>{error}</p>}
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-right">
                <h1>Bienvenido Usuario</h1>
                <p>¡Espero este teniendo un buen día!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer id="foot">
        <small id="derechos">© 2024  <b>Aulas</b> - todos los derechos reservados</small>
      </footer>
    </div>
  );
}

export default Login;
