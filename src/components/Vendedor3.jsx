import React from 'react';
import './Vendedor1.css';
import { Link } from 'react-router-dom';

const Vendedor1 = () => {
  return (
        
            <div>
           <nav className="navbar" style={{ backgroundColor: '#cd3030' }}>
            <div className="container-fluid">
            <a className="navbar-brand" href="index.html">
                <img src="./img/logo.png" alt="Logo" width={300} height={120} className="d-inline-block align-text-top" />
            </a>
            </div>
             </nav>
            <main className="apart">
                <div className="sidebar baja">
                <h2>Menu</h2>
                <ul className="menu_nav">
                    <li>
                      <Link to="/VentasV">
                        <i className="fa-sharp fa-solid fa-cart-shopping" />
                        <label htmlFor="btn-modal-ventas">
                        Ventas
                        </label>
                      </Link>
                    </li>
                    <li>
                    <a href="productos_vendedor.php" className="but_menu">
                        <i className="fas fa-server" />
                        <label htmlFor="btn-modal-ventas">
                        Productos
                        </label>
                    </a>
                    </li>
                    <li>
                    <a href="proveedor-v.php" className="but_menu">
                        <i className="fa-solid fa-boxes-stacked" />
                        Proveedores
                    </a>
                    </li>
                    <li>
                    <a href="dsc/informe.docx" className="but_menu" download="Vendedor 1" id="liveToastBtn">
                        <i className="fa-solid fa-file" />
                        <label htmlFor="btn-modal-ventas">
                        Generar informe
                        </label>
                    </a>
                    </li>
                    <li id="li_cerrar">
                    <a href="#" className="but_menu">
                        <i className="fa-regular fa-circle-xmark" />
                        <label htmlFor="btn-modal">
                        Cerrar sesión
                        </label>
                    </a>
                    </li>
                </ul>
                </div>
                {/*Ventana Modal Cierre Sesión*/}
                <input type="checkbox" id="btn-modal" />
                <div className="container-modal">
                <div className="content-modal">
                    <h2>¡Hasta pronto!</h2>
                    <p>¡Esperamos verte pronto de regreso! Que tengas un excelente día.</p>
                    <div className="btn-cerrar">
                    <Link to="/Indexven" className="but_menu">
                    <label htmlFor="btn-modal">Cerrar</label>
                    </Link>    
                    </div>
                </div>
                <label htmlFor="btn-modal" className="cerrar-modal" />
                </div>
                {/*Fin de Ventana Modal*/}

                <div className="main">
                <div style={{width: '1rem'}}>
                    <img src="../img/user.png" className="card-img-top" href="#" />
                    <div className="card-vendedor">
                    <h5 className="card-vendedor-text">¡Bienvenido, vendedor 3!</h5>
                    <br />
                    <p className="card-text">En esta sección se puede ingresar a las diferentes funciones para los vendedores de la papelería Aulas</p>
                    </div>
                </div>
                </div>  
                <div className="pqrs">
                <section id="pqrs_se">
                    <a href="Pqrs.html" id="icon_pqrs"><i className="fa-solid fa-circle-exclamation icon" id="icon_pqrs" href="Pqrs.html" /></a>
                </section> 
                </div> 
            </main>
            <div className="pqrs">
                <i className="fa-solid fa-circle-exclamation fa-beat" />
            </div>
            <footer id="foot">
                <small id="derechos">© 2023  <b>Aulas</b> - todos los derechos reservados</small>
            </footer>
            </div>




        );
}
export default Vendedor1

