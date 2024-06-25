import React from "react";
import { Link } from 'react-router-dom';
import './css/Indexven.css'; 

const Indexven = () => {
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
          <h2>Menu</h2>
          <ul className="menu_nav">
            <li>
              <a href="#" className="but_menu">
                <i className="fa-sharp fa-solid fa-cart-shopping" />
                <label htmlFor="btn-modal-ventas">
                  Ventas
                </label>
              </a>
            </li>
            <li>
              <a href="#" className="but_menu">
                <i className="fas fa-server" />
                <label htmlFor="btn-modal-ventas">
                   Productos
                </label>
              </a>
            </li>
            <li id="li_cerrar">
              <a href="#" className="but_menu">
                <i className="fa-regular fa-circle-xmark" />
                <label htmlFor="btn-modal">
                  Cerrar Sesion
                </label>
              </a>
            </li>
          </ul>
        </div>
        {/* Ventana Modal Cierre Advertencia */}
        <input type="checkbox" id="btn-modal-ventas" />
        <div className="container-modal-ventas">
          <div className="content-modal-ventas">
            <h2>¡Advertencia!</h2>
            <p>Para ingresar a este apartado se tiene que seleccionar un perfil de usuario.</p>
            <div className="btn-cerrar-ventas">
              <label htmlFor="btn-modal-ventas">Cerrar</label>
            </div>
          </div>
          <label htmlFor="btn-modal-ventas" className="cerrar-modal-ventas" />
        </div>
        {/* Fin de Ventana Modal Advertencia */}
        {/* Ventana Modal Cierre Sesión */}
        <input type="checkbox" id="btn-modal" />
        <div className="container-modal">
          <div className="content-modal">
            <h2>¡Hasta pronto!</h2>
            <p>¡Esperamos verte pronto de regreso! Que tengas un excelente día.</p>
            <div className="btn-cerrar">
              <Link to="/Login">
              <label htmlFor="btn-modal">Cerrar</label>
              </Link>
            </div>
          </div>
          <label htmlFor="btn-modal" className="cerrar-modal" />
        </div>
        {/* Fin de Ventana Modal */}
        <div className="main">
          <h2>Bienvenido vendedor.</h2>
          <p className="p1">
          Por favor ingresa a tu perfil de gestión.
          </p>
          <div className="boton">
            <Link to="/vendedor1">
              <button id="btnav" type="button">
                <img src="../img/user.png" alt="User" />
                <p>Vendedor</p>
              </button>
            </Link>
          </div>
        </div>
      </main>
      <section>
        <div className="pqrs">
          <i className="fa-solid fa-circle-exclamation fa-beat" />
        </div>
      </section>
      <footer id="foot">
        <small id="derechos">© 2024  <b>Aulas</b> - todos los derechos reservados</small>
      </footer>
    </div>
  );
}

export default Indexven;
