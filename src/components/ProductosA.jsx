import { Link } from 'react-router-dom';
import './css/ProductosA.css';
import React, {useState, useEffect} from 'react';
import  axios  from 'axios';
import { useRef } from 'react';

const ProductosA = () => {

    const url="http://localhost/apiaulas3/public/api/producto";
    const urlP="http://localhost/apiaulas3/public/api/producto-pdf";
    const [producto,setProducto] = useState([])
    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const myFormRef = useRef(null);

    useEffect(()=>{
        getProducto();
    },[]);

    const getProducto = async ()=>{
        try {
            const respuesta = await axios.get(url);
            setProducto(respuesta.data.data);
            extractUniqueProveedores(respuesta.data.data);
            extractUniqueCategorias(respuesta.data.data);
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

    const extractUniqueProveedores = (productos) => {
        const proveedoresSet = new Set();
        productos.forEach(item => {
            proveedoresSet.add(JSON.stringify(item.proveedor));
        });
        const uniqueProveedores = Array.from(proveedoresSet).map(item => JSON.parse(item));
        setProveedores(uniqueProveedores);
    };

    const extractUniqueCategorias = (productos) => {
      const categoriasSet = new Set();
      productos.forEach(item => {
        categoriasSet.add(JSON.stringify(item.categoria));
      });
      const uniqueCategorias = Array.from(categoriasSet).map(item => JSON.parse(item));
      setCategorias(uniqueCategorias);
    };

    const handleCrearProducto = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario
      
        const formData = new FormData(myFormRef.current); // Suponiendo que tienes un formulario con una referencia
        const nombreProducto = formData.get('nom_producto');
        const precio_unitario = formData.get('precio_unitario');
        const unidades_disponibles = formData.get('unidades_disponibles');
        const marca = formData.get('marca');
        const id_proveedor = formData.get('id_proveedor');
        const id_categoria = formData.get('id_categoria');

      
        const productData = {
            nom_producto: nombreProducto,
            precio_unitario: precio_unitario,
            unidades_disponibles: unidades_disponibles,
            marca: marca,
            id_proveedor: id_proveedor,
            id_categoria: id_categoria,
          };
      
        enviarDatosProducto(productData);
      };
      
      const enviarDatosProducto = async (productData) => { // Define la función enviarDatosProducto
        try {
          const respuesta = await axios.post(url, productData);
          console.log('Producto creado exitosamente:', respuesta.data);
          setSuccessMessage("El producto se creó exitosamente.");
          alert("producto registrado correctamente")
          myFormRef.current.reset();
          window.location.reload();
        } catch (error) {
          console.error('Error al crear el producto:', error);
          alert("error al registrar el producto")
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
      <div>
        <main className="apart">
            <div className="sidebar">
            <h2>Menu</h2>
            <ul className="menu_nav">
                <li>
                <Link to="/Indexadm" className="but_menu">
                    <i className="fas fa-server" />
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
                <Link to="/Proveedores" className="but_menu">
                    <i className="fa-solid fa-truck-field" />      
                    <label htmlFor="btn-modal-ventas">
                    Proveedores
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
                <a href="Vendedor.html" className="but_menu">
                    <i className="fa-solid fa-users" />
                    <label htmlFor="btn-modal-ventas">
                    Vendedor
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
            <input type="checkbox" id="btn-modal-añadir" />
            <div className="container-modal-añadir">
            <div className="content-modal-añadir">
                <h2>Productos</h2>
                <div>
                <form form ref={myFormRef} className="formulario">
                    <div className="f1">
                        <input type="text" name="nom_producto" className="in" placeholder="nombre producto" required="required" />
                        <input type="text" name="precio_unitario" className="in" placeholder="precio unitario:" required="required" />
                        <input type="number" name="unidades_disponibles" className="in" placeholder="unidades disponibles:" required="required" />
                        <input type="text" name="marca" className="in" placeholder="marca:" required="required" />
                        <select name="id_proveedor" id="" className="in" required>
                          <option value="" disabled selected>Selecciona un proveedor</option>
                          {proveedores.map((item, index) => (
                              <option key={index} value={item.id_proveedor}>
                                  {item.nom_proveedor}
                              </option>
                          ))}
                        </select>
                        <select name="id_categoria" id="" className="in" required>
                          <option value="" disabled selected>Selecciona una categoria</option>
                          {categorias.map((item, index) => (
                              <option key={index} value={item.id_categoria}>
                                  {item.nombre_categoria}
                              </option>
                          ))}
                        </select>
                        <button type="button" onClick={handleCrearProducto}>Registrar</button>
                    </div>
                </form>

                </div>
            </div>
            <label htmlFor="btn-modal-añadir" className="cerrar-modal-añadir" />
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
                <div className="but_cont">
                <section id="ag_prod">
                    <a href="#" id="but_ag"><label htmlFor="btn-modal-añadir">
                        Añadir Producto
                    </label></a>
                </section>
                <section id="ag_prod">
                    <a href="#" id="but_ag" onClick={getPdf}>Generar informe</a>
                </section>
                </div>
                <section>
                <table className="table table-striped">
                    <div id="div_buscador">
                      <img src="../img/Lupa.png" alt="Lupa" />
                      <input type="text" id="buscador" placeholder="Busca algún Producto:" value={searchTerm} onChange={handleBuscar} />
                    </div>
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">id_producto</th>
                        <th scope="col">producto</th>
                        <th scope="col">precio unitario</th>
                        <th scope="col">unidades disponibles</th>
                        <th scope="col">marca</th>
                        <th scope="col">proveedor</th>
                        <th scope="col">categoria</th>
                    </tr>
                    </thead>
                    <tbody>
                    {producto.filter(item =>
                      item.nom_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.id_producto.toString().includes(searchTerm) ||
                      item.precio_unitario.toString().includes(searchTerm) ||
                      item.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.proveedor.nom_proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.categoria.nombre_categoria.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ).map((item) => (
                      <tr key={item.id_producto}>
                        <th scope="row">{item.id_producto}</th>
                        <td>{item.nom_producto}</td>
                        <td>{item.precio_unitario}</td>
                        <td>{item.unidades_disponibles}</td>
                        <td>{item.marca}</td>
                        <td>{item.proveedor.nom_proveedor}</td>
                        <td>{item.categoria.nombre_categoria}</td>
                      </tr>
                    ))}
                    </tbody>
                    </table>
                </section>
                <div id="div_buscador">
                <img src="../img/Lupa.png" alt />
                <input type="text" id="buscador" placeholder="Busca algún Producto:" />
                </div>
            </div>
            </section>
        </main>
        </div>
        <div>
                <footer id="foot">
                <small id="derechos">&copy; 2023  <b>Aulas</b> - todos los derechos reservados</small>
                </footer>
            </div>
            </div>
        );
}
export default ProductosA;
