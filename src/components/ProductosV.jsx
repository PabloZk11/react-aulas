import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ProductosV.css'; 

const ProductosV = () => {
    const url = "http://apiaulas.test/api/producto";
    const urlP = "http://apiaulas.test/api/producto-pdf";
    const [producto, setProducto] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const myFormRef = useRef(null);
  
    useEffect(() => {
      getProducto();
    }, []);
  
    const getProducto = async () => {
      try {
        const respuesta = await axios.get(url);
        setProducto(respuesta.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    const getPdf = async () => {
      try {
        const respuesta = await axios.get(urlP, { responseType: "arraybuffer" });
        const file = new Uint8Array(respuesta.data);
        const urlPDF = window.URL.createObjectURL(new Blob([file], { type: 'application/pdf' }));
        window.open(urlPDF, "_blank");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    const handleCrearProducto = (event) => {
      event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario
  
      const formData = new FormData(myFormRef.current);
      const nombreProducto = formData.get('nom_producto');
      const precio_unitario = formData.get('precio_unitario');
      const unidades_disponibles = formData.get('unidades_disponibles');
      const marca = formData.get('marca');
      const proveedor_id_proveedor = formData.get('id_proveedor');
      const categoria_producto = formData.get('categoria');
  
      const productData = {
        nom_producto: nombreProducto,
        precio_unitario: precio_unitario,
        unidades_disponibles: unidades_disponibles,
        marca: marca,
        proveedor_id_proveedor: proveedor_id_proveedor,
        categoria_producto: categoria_producto,
      };
  
      enviarDatosProducto(productData);
    };
  
    const enviarDatosProducto = async (productData) => {
      try {
        const respuesta = await axios.post(url, productData);
        console.log('Producto creado exitosamente:', respuesta.data);
        setSuccessMessage("El producto se creó exitosamente.");
        myFormRef.current.reset();
        window.location.reload();
      } catch (error) {
        console.error('Error al crear el producto:', error);
        // Maneja errores durante la solicitud POST (por ejemplo, muestra un mensaje de error)
      }
    };

    const handleBuscar = (event) => {
        setSearchTerm(event.target.value);
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
            <li>
        <Link to="/Indexven" className="but_menu">
                <i className="fas fa-server" />
                <label htmlFor="btn-modal-ventas">
                Inicio
                </label>
            </Link>
            </li>
            <li>
            <Link to="/VentasV" className="but_menu">
                <i className="fa-sharp fa-solid fa-cart-shopping" />
                <label htmlFor="btn-modal-ventas">
                Ventas
                </label>
            </Link>
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
            <label htmlFor="btn-modal"><Link to="/Index">Cerrar</Link>
            </label>
            </div>
        </div>
        <label htmlFor="btn-modal" className="cerrar-modal" />
        </div>
        {/*Fin de Ventana Modal*/}
        <section id="cont_table">
        <div className="cont">
            <h2 className="title">Productos</h2>   
            <section>
            <table className="table table-striped">
                <div id="div_buscador">
                    <img src="../img/Lupa.png" alt="Lupa" />
                    <input type="text" id="buscador" placeholder="Busca algún Producto:" value={searchTerm} onChange={handleBuscar} />
                </div>
                <thead className="table-dark">
                <tr>
                    <th scope="col">Id_producto</th>
                    <th scope="col">Id_Categoria</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Nom_producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Unidades</th>
                    <th scope="col">Descripcion/Detalles</th>
                </tr>
                </thead>
                <tbody>
                {producto.filter(item =>
                      item.nom_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.id_producto.toString().includes(searchTerm) ||
                      item.precio_unitario.toString().includes(searchTerm) ||
                      item.marca.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((item) => (
                      <tr key={item.id_producto}>
                        <th scope="row">{item.id_producto}</th>
                        <td>{item.nom_producto}</td>
                        <td>{item.precio_unitario}</td>
                        <td>{item.unidades_disponibles}</td>
                        <td>{item.marca}</td>
                        <td>{item.proveedor_id_proveedor}</td>
                        <td>{item.categoria_producto}</td>
                      </tr>
                    ))}
                </tbody></table>
            </section>
        </div></section></main>
  
    <footer id="foot">
        <p id="derechos">J&amp;M D.S - Todos los derechos reservados</p>
    </footer>
    </div>

        );
}
export default ProductosV;
