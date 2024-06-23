import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './css/Mercancia.css';
import  axios  from 'axios';
import { useRef } from 'react';

export const Mercancia = () => {

  const url="https://laravel-production-fb9e.up.railway.app/api/entrada_mercancia";
  const urlPe="https://laravel-production-fb9e.up.railway.app/api/pedido";
  const urlPr="https://laravel-production-fb9e.up.railway.app/api/producto";
  const urlP="https://laravel-production-fb9e.up.railway.app/api/entrada-pdf";
  const [entradas,setEntradas] = useState([]);
  const [pedido,setPedido] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [producto,setProducto] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const myFormRef = useRef(null);


  useEffect(()=>{
    getEntrada();
    getProducto();
    getPedido();
  },[]);

  const getEntrada = async ()=>{
    try {
        const respuesta = await axios.get(url);
        setEntradas(respuesta.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

const getPedido = async ()=>{
  try {
      const respuesta = await axios.get(urlPe);
      setPedido(respuesta.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

const getProducto = async ()=>{
  try {
      const respuesta = await axios.get(urlPr);
      setProducto(respuesta.data.data);
      extractUniqueProveedores(respuesta.data.data);
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

const handleCrearSalida = (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario

  const formData = new FormData(myFormRef.current); // Suponiendo que tienes un formulario con una referencia
  const cantidad_unidades = formData.get('cantidad_unidades');
  const id_producto = formData.get('id_producto');
  const id_pedido = formData.get('id_pedido');
  const id_proveedor = formData.get('id_proveedor');


  const productData = {
    cantidad_unidades: cantidad_unidades,
    id_producto: id_producto,
    id_pedido: id_pedido,
    id_proveedor: id_proveedor,
    };

    enviarDatosSalidas(productData);
};

const enviarDatosSalidas = async (productData) => { // Define la función enviarDatosProducto
  try {
    const respuesta = await axios.post(url, productData);
    console.log('Entrada regsitrada exitosamente:', respuesta.data);
    setSuccessMessage("La Entrada se registro exitosamente.");
    alert("Entrada registrada correctamente");
    myFormRef.current.reset();
    window.location.reload();
  } catch (error) {
    console.error('Error al crear al registrar la entrada:', error);
    alert("error al registrar la entrada");
  }
};

const handleBuscar = (event) => {
  setSearchTerm(event.target.value);
};

  return (
            <div>
            <div className="">
            <nav className="navbar" style={{ backgroundColor: '#cd3030' }}>
                <div className="container-fluid">
                <a className="navbar-brand" href="index.html">
                    <img src="./img/logo.png" alt="Logo" width={300} height={120} className="d-inline-block align-text-top" />
                </a>
                </div>
                </nav>
                </div>
        <main className="apart">
            <div className="sidebar baja">
            <h2>Menú</h2>
            <ul className="menu_nav">
            <li>
                <Link to="/Indexadm" className="but_menu">
                    <i className="fa-sharp fa-solid fa-cart-shopping" />
                    <label htmlFor="btn-modal-ventas">
                    Inicio
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
                <li>
                <Link to="/VentasA" className="but_menu">
                    <i className="fa-solid fa-boxes-stacked" />
                    <label htmlFor="btn-modal-ventas">
                    Ventas
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
          <label htmlFor="btn-modal"><Link to="/Login">Cerrar</Link>
          </label>
        </div>
      </div>
      <label htmlFor="btn-modal" className="cerrar-modal" />
    </div>
    {/*Fin de Ventana Modal*/} 
    {/*Ventana Modal Cierre Advertencia*/}
    <input type="checkbox" id="btn-modal-añadir" />
    <div className="container-modal-añadir">
      <div className="content-modal-añadir">
        <h2>Registrar Entrada Mercancia</h2>
        <div>
          <form form ref={myFormRef} className="formulario">
            <div className="f1">
              <input type="number" name="cantidad_unidades" className="in" placeholder="unidades:" required="required" />
              <select name="id_producto" className="in" required>
                  <option value="" disabled selected>Selecciona un producto</option>
                  {producto.map((item) => (
                  <option key={item.id_producto} value={item.id_producto}>
                      {item.nom_producto}
                  </option>
                  ))}
              </select>
              <select name="id_pedido" className="in" required>
                  <option value="" disabled selected>Selecciona un pedido</option>
                  {pedido.map((item) => (
                  <option key={item.id_pedido} value={item.id_pedido}>
                      {item.id_pedido}
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

              <button type="button" onClick={handleCrearSalida}>Registrar</button>
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
    <section id="cont_table" >
      <div className="cont baja">
        <h2 className="title">Entradas Mercancia</h2>   
        <div className="but_cont">
          <section id="ag_prod">
            <a href="#" id="but_ag"><label htmlFor="btn-modal-añadir">
                Añadir Entrada Mercancia
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
          <section id="ag_prod">
            <a href="dsc/imprimir.pdf" id="but_ag" download="Ultima Venta">Imprimir última venta</a>
          </section>
        </div>
        <section>
          <table className="table table-striped">
              <div id="div_buscador">
                    <img src="../img/Lupa.png" alt />
                    <input type="text" id="buscador" placeholder="Buscar mercancía:" value={searchTerm} onChange={handleBuscar} />
              </div>
            <thead className="table-dark">
              <tr>
                <th scope="col">id_entrada</th>
                <th scope="col">unidades</th>
                <th scope="col">producto</th>
                <th scope="col">numero pedido</th>
                <th scope="col">proveedor</th>
              </tr>
            </thead>
          <tbody>
          {entradas.filter(item =>
		      item.id_entrada.toString().includes(searchTerm) || 
                      item.cantidad_unidades.toString().includes(searchTerm)||
                      item.producto.nom_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||                      
                      item.id_pedido.toString().includes(searchTerm)||
                      item.proveedor.nom_proveedor.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ).map((item) => (
                      <tr key={item.id_entrada}>
                      <th scope="row">{item.id_entrada}</th>
                      <td>{item.cantidad_unidades}</td>
                      <td>{item.producto.nom_producto}</td>
                      <td>{item.id_pedido}</td>
                      <td>{item.proveedor.nom_proveedor}</td>
                      </tr>
                    ))}
        </tbody>

        </table>
        </section>
        <div id="div_buscador">
          <img src="../img/Lupa.png" alt />
          <input type="text" id="buscador" placeholder="Busca alguna venta" />
        </div>
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

export default Mercancia;