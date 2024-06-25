import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Indexadm.css';

export const Indexadm = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (response.ok) {
        navigate('/Login'); 
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
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
      <main className="apart">
        <div className="sidebar">
          <h2>Menú</h2>
          <ul className="menu_nav">
            <li id="li_cerrar">
              <Link to="/ventasA" className="but_menu">
                <i className="fa-sharp fa-solid fa-cart-shopping" />
                <label htmlFor="btn-modal-ventas">
                  Ventas
                </label>
              </Link>
            </li>
            <li>
              <Link to="/ProductosA" className="but_menu">
                <i className="fas fa-server" />
                <label htmlFor="btn-modal-ventas">
                  Productos
                </label>
              </Link>
            </li>
            <li>
              <Link to="/Proveedores" className="but_menu">
                <i className="fa-solid fa-truck-field" />
                <label htmlFor="btn-modal-ventas">
                  Pedidos
                </label>
              </Link>
            </li>
            <li>
              <Link to="/Mercancia" className="but_menu">
                <i className="fa-solid fa-boxes-stacked" />
                <label htmlFor="btn-modal-ventas">
                  Entradas Mercancia
                </label>
              </Link>
            </li>
            <li>
              <Link to="/devolucion" className="but_menu">
                <i className="fa-solid fa-boxes-stacked" />
                <label htmlFor="btn-modal-ventas">
                  Devoluciones
                </label>
              </Link>
            </li>
            <li>
              <Link to="/Usuarios" className="but_menu">
                <i className="fas fa-server" />
                <label htmlFor="btn-modal-ventas">
                  Usuarios
                </label>
              </Link>
            </li>
            <li>
              <Link to="/Proveedores" className="but_menu">
                <i className="fas fa-server" />
                <label htmlFor="btn-modal-ventas">
                  Proveedores
                </label>
              </Link>
            </li>
            <li id="li_cerrar">
              <button onClick={handleLogout} className="but_menu">
                <i className="fa-regular fa-circle-xmark" />
                <Link to="/Login"><label htmlFor="btn-modal-ventas">
                  Cerrar sesión
                </label>
                </Link>
              </button>
            </li>
          </ul>
        </div>
        {/* Ventana Modal Cierre Sesión */}
        <input type="checkbox" id="btn-modal" />
        <div className="container-modal">
          <div className="content-modal">
            <h2>¡Hasta pronto!</h2>
            <p>¡Esperamos verte pronto de regreso! Que tengas un excelente día.</p>
            <div className="btn-cerrar">
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'inherit' }}>
                <Link to="/Index">Cerrar</Link>
              </button>
            </div>
          </div>
          <label htmlFor="btn-modal" className="cerrar-modal" />
        </div>
        {/* Fin de Ventana Modal */}
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src="../img/admin.png" className="rounded me-2" alt="..." width={25} height={25} />
              <strong className="me-auto">Mensaje</strong>
              <small>Hace 1 minuto</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
            </div>
            <div className="toast-body">
              Se ha generado un informe
            </div>
          </div>
        </div>
        {/* Fin de Ventana Modal */}
        <div className="main">
          <div className="card" style={{ width: '20rem' }}>
            <img className="card-img-top" alt="Admin" />
            <div className="card-body">
              <p className="card-title text-center">¡Bienvenido, administrador!</p>
              <h5 className="card-text">En la barra lateral izquierda podrás encontrar botones que te indicarán los apartados que necesites para los vendedores de la palería Aulas</h5>
            </div>
          </div>
        </div>
      </main>
      <footer id="foot">
        <small id="derechos">© 2023  <b>Aulas</b> - todos los derechos reservados</small>
      </footer>
    </div>
  );
}

export default Indexadm;
