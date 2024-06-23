import { Link } from 'react-router-dom';
import './css/Proveedores.css';
import React, {useState, useEffect} from 'react';
import  axios  from 'axios';
import { useRef } from 'react';

const Proveedores = () => {

    const url="http://localhost/apiaulas3/public/api/pedido";
    const urlP="http://localhost/apiaulas3/public/api/pedido-pdf";
    const urlU="http://localhost/apiaulas3/public/api/usuario";
    const urlPr="http://localhost/apiaulas3/public/api/producto";
    const [pedido,setPedido] = useState([]);
    const [usuario,setUsuario] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [producto,setProducto] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const myFormRef = useRef(null);

    useEffect(()=>{
        getPedido();
        getProducto();
        getUsuario();
    },[]);

    const getPedido = async ()=>{
        try {
            const respuesta = await axios.get(url);
            setPedido(respuesta.data.data);
            extractUniqueProveedores(respuesta.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const extractUniqueProveedores = (productos) => {
        const proveedoresSet = new Set();
        productos.forEach(item => {
            proveedoresSet.add(JSON.stringify(item.proveedor));
        });
        const uniqueProveedores = Array.from(proveedoresSet).map(item => JSON.parse(item));
        setProveedores(uniqueProveedores);
    };

    const getProducto = async ()=>{
        try {
            const respuesta = await axios.get(urlPr);
            setProducto(respuesta.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const getUsuario = async ()=>{
        try {
            const respuesta = await axios.get(urlU);
            setUsuario(respuesta.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const admin = usuario.filter(usuario => usuario.id_rol === 1);

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

    const handleCrearPedido = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario
      
        const formData = new FormData(myFormRef.current); // Suponiendo que tienes un formulario con una referencia
        const unidades = formData.get('unidades');
        const id_producto = formData.get('id_producto');
        const id_usuario = formData.get('id_usuario');
        const id_proveedor = formData.get('id_proveedor');

      
        const productData = {
            unidades: unidades,
            id_producto: id_producto,
            id_usuario: id_usuario,
            id_proveedor: id_proveedor,
          };
      
          enviarDatosPedido(productData);
      };
      
      const enviarDatosPedido = async (productData) => { // Define la función enviarDatosProducto
        try {
          const respuesta = await axios.post(url, productData);
          console.log('Pedido creado exitosamente:', respuesta.data);
          setSuccessMessage("El pedido se creó exitosamente.");
          alert("pedido registrado correctamente");
          myFormRef.current.reset();
          window.location.reload();
        } catch (error) {
          console.error('Error al crear el pedido:', error);
          alert("error al registrar el pedido");
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
                <Link to="/Indexadm" className="but_menu">
                    <i className="fa-solid fa-truck-field" />      
                    <label htmlFor="btn-modal-ventas">
                    Inicio
                    </label>
                </Link>
                </li>
                <li>
                <Link to="/VentasA" className="but_menu">
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
                <Link to="/Mercancia" className="but_menu">
                    <i className="fa-solid fa-boxes-stacked" />
                    <label htmlFor="btn-modal-ventas">
                    Mercancia
                    </label>
                </Link>
                </li>
                <li id="li_cerrar">
                <Link to="/Usuarios" className="but_menu">
                    <i className="fa-solid fa-users" />
                    <label htmlFor="btn-modal-ventas">
                    Usuarios
                    </label>
                    </Link>
                </li>
                <li>
                <a href="dsc/informe.docx" className="but_menu" download="administrador Informe">
                    <i className="fa-solid fa-file" />
                    <label htmlFor="btn-modal-ventas">
                    Generar Informe
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
                <label htmlFor="btn-modal"><a href="index.html">Cerrar</a></label>
                </div>
            </div>
            <label htmlFor="btn-modal" className="cerrar-modal" />
            </div>
            {/*Ventana Modal Cierre Advertencia*/}
            <input type="checkbox" id="btn-modal-añadir" />
            <div className="container-modal-añadir">
            <div className="content-modal-añadir">
                <h2>Crear Pedido</h2>
                <div>
                <form form ref={myFormRef} className="formulario">
                    <div className="f1">
                    <input type="search" name="unidades" className="in" placeholder="unidades :" required="required" />
                    <select name="id_producto" className="in" required>
                        <option value="" disabled selected>Selecciona un producto</option>
                        {producto.map((item) => (
                        <option key={item.id_producto} value={item.id_producto}>
                            {item.nom_producto}
                        </option>
                        ))}
                    </select>
                    <select name="id_usuario" className="in" required>
                        <option value="" disabled selected>Selecciona un admin</option>
                        {admin.map((item) => (
                        <option key={item.id_usuario} value={item.id_usuario}>
                            {item.nombre}
                        </option>
                        ))}
                    </select>
                    <select name="id_proveedor" id="" className="in" required>
                        <option value="" disabled selected>Selecciona un proveedor</option>
                        {proveedores.map((item, index) => (
                            <option key={index} value={item.id_proveedor}>
                                {item.nom_proveedor}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleCrearPedido}>Registrar</button>
                    </div>
                </form> 
                </div>
            </div>
            <label htmlFor="btn-modal-añadir" className="cerrar-modal-añadir" />
            </div>
            {/*Fin de Ventana Modal Advertencia*/}
            {/*Ventana Modal Filtro*/}
            <input type="checkbox" id="btn-modal-filtro" />
            <div className="container-modal-filtro">
            <div className="content-modal-filtro">
                <h2>Filtrar Ventas</h2>
                <p>En este apartado podras elegir desde que fecha quieres 
                ver las ventas realizadas en la papeleria Aulas. </p>
                <div>
                <form className="formulario">
                    <div className="f1">
                    <input type="date" name="Fecha" className="in" placeholder="Fecha:" required="required" /> 
                    </div>
                </form> 
                </div>
                <div className="btn-cerrar-filtro">
                <label htmlFor="btn-modal-filtro"><a href="ventas_vendedor_vacio.html"><input type="submit" defaultValue="Añadir" className="enviar" /></a></label>
                </div>
            </div>
            <label htmlFor="btn-modal-filtro" className="cerrar-modal-filtro" />
            </div>
            {/*Fin de Ventana Modal*/}
            <section id="cont_table">
            <div className="cont">
                <h2 className="title">Pedidos</h2>   
                <div className="but_cont">
                <section id="ag_prod">
                    <a href="#" id="but_ag"><label htmlFor="btn-modal-añadir">
                        Crear Pedido
                    </label></a>
                </section>
                <section id="ag_prod">
                    <a href="#" id="but_ag"><label htmlFor="btn-modal-filtro">
                        Filtro
                    </label></a>
                </section>
                <section id="ag_prod">
                    <a href="#" id="but_ag" onClick={getPdf}>Generar informe</a>
                </section>
                </div>
                {/*Fin de Ventana Modal*/}
                <section>
                <table className="table table-striped">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Id_pedido</th>
                        <th scope="col">unidades</th>
                        <th scope="col">producto</th>
                        <th scope="col">admin</th>
                        <th scope="col">proveedor</th>
                    </tr>
                    </thead>
                    <tbody>
                     {pedido.filter(item =>
                      item.id_pedido.toString().includes(searchTerm) || 
                      item.unidades.toString().includes(searchTerm) || 
                      item.producto.nom_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.proveedor.nom_proveedor.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ).map((item) => (
                       <tr key={item.id_pedido}>
                        <th scope="row">{item.id_pedido}</th>
                        <td>{item.unidades}</td>
                        <td>{item.producto.nom_producto}</td>
                        <td>{item.usuario.nombre}</td>
                        <td>{item.proveedor.nom_proveedor}</td>
                        </tr>
                    ))}
                    </tbody></table>
                </section>
            </div>
            </section>
        </main>
        <div className="pqrs">
            <i className="fa-solid fa-circle-exclamation fa-beat" />
        </div>
        <footer id="foot">
            <p id="derechos">J&amp;M D.S - Todos los derechos reservados</p>
        </footer>
        </div>

        );
}
export default Proveedores;
