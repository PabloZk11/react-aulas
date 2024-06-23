import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Login.css';

const Login = () => {
  const url = "http://localhost/apiaulas3/public/api/login";
  const [email, setEmail] = useState('');
  const [contraseña, setcontraseña] = useState('');
  const [error, setError] = useState('');

  const handleVerificacionUsuario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { email, contraseña});
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
        <Link to="/Indexven" className="boton-esquina">Ingresar como Vendedor</Link>
        <div id="container">
          <div className="form-container sign-up" />
          <div className="form-container sign-in">
            <form onSubmit={handleVerificacionUsuario}>
              <h1>Ingresar</h1>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setcontraseña(e.target.value)} />
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
      <div className="pqrs">
        <a href="pqrs.html"><i className="fa-solid fa-circle-exclamation fa-beat" /></a>
      </div>
      <footer id="foot">
        <small id="derechos">© 2024  <b>Aulas</b> - todos los derechos reservados</small>
      </footer>
    </div>
  );
}

export default Login;
