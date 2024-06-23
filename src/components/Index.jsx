import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import './css/Index.css';

function Index() {
  useEffect(() => {
    const mostrarMenu = () => {
      nav.style.right = "0px";
      backgroundMenu.style.display = "block";
    };

    const ocultarMenu = () => {
      nav.style.right = "-250px";
      backgroundMenu.style.display = "none";
    };

    const btnMenu = document.getElementById("btn_menu");
    const backMenu = document.getElementById("back_menu");
    const nav = document.getElementById("nav");
    const backgroundMenu = document.getElementById("back_menu");

    btnMenu.addEventListener("click", mostrarMenu);
    backMenu.addEventListener("click", ocultarMenu);

    return () => {
      btnMenu.removeEventListener("click", mostrarMenu);
      backMenu.removeEventListener("click", ocultarMenu);
    };
  }, []); 

  return (
    <div>
      <header>
        <div className="container_menu">
          <div className="logo">
            <img src="img/logo.png" alt="" />
          </div>
          <div className="menu">
            <i className="fa-solid fa-bars" id="btn_menu" />
            <div id="back_menu" />
            <nav id="nav">
              <img src="img/logo.png" alt="" />
              <ul>
                <li><a id="selected"><Link to="/">Inicio</Link></a></li>
                <li><a><Link to="/Login">Login</Link></a></li>
                <li><a><Link to="/Indexven">Vendedor</Link></a></li>
                <li><a href="#">Contactanos</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <div className="container_cover">
          <div className="cover">
            <div className="text">
              <h1>Aulas Papelería</h1>
              <p>Es un establecimiento especializado en papelería 
                escolar universitaria y de oficina, además de 
                encontrar un gran surtido en juguetería, piñatería y 
                variedades en general, encontramos también una 
                sección especializada en servicio de multicopiado, 
                anillado y laminación.</p>
              <input type="button" defaultValue="Leer Mas" />
            </div>
            <div className="svg">
              <img src="img/robot_aulas.png" alt="" />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="box__copyright">
          <hr />
          <p>Todos los derechos reservados © 2021 <b>M&amp;J</b></p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
