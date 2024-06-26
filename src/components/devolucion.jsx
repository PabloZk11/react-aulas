import { Link } from 'react-router-dom';
import './css/Mercancia.css'; 
import React, {useState, useEffect} from 'react';
import  axios  from 'axios';
import { useRef } from 'react';

const Devolucion = () => {

  const url="https://laravel-production-fb9e.up.railway.app/api/devolucion";
  const urlP="https://laravel-production-fb9e.up.railway.app/api/devolucion-pdf";
  const urlEn="https://laravel-production-fb9e.up.railway.app/api/entrada_mercancia";
  const urlPr="https://laravel-production-fb9e.up.railway.app/api/producto";
  const [devolucion,setDevolucion] = useState([])
  const [entradas,setEntradas] = useState([]);
  const [producto,setProducto] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const myFormRef = useRef(null);

  useEffect(()=>{
    getDevolucion();
    getEntrada();
    getProducto();
  },[]);

  const getDevolucion = async ()=>{
      try {
          const respuesta = await axios.get(url);
          setDevolucion(respuesta.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  }
  
  const getEntrada = async ()=>{
    try {
        const respuesta = await axios.get(urlEn);
        setEntradas(respuesta.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  const getProducto = async ()=>{
    try {
        const respuesta = await axios.get(urlPr);
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
  
  const handleCrearDevolucion = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario
  
    const formData = new FormData(myFormRef.current); // Suponiendo que tienes un formulario con una referencia
    const id_producto = formData.get('id_producto');
    const unidades = formData.get('unidades');
    const id_entrada = formData.get('id_entrada');

  
    const productData = {
        id_producto: id_producto,
        unidades: unidades,
        id_entrada: id_entrada
        
      };
  
      enviarDatosDevolucion(productData);
  };
  
  const enviarDatosDevolucion = async (productData) => { // Define la función enviarDatosProducto
    try {
      const respuesta = await axios.post(url, productData);
      console.log('Devolucion registrado exitosamente:', respuesta.data);
      setSuccessMessage("El usuario se registro exitosamente.");
      alert("devolucion registrada correctamente");
      myFormRef.current.reset();
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar la devolucion:', error);
      alert("error al registrar la devolucion");
    }
  };

  const handleBuscar = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="simula-body">
    <nav className="navbar" style={{ backgroundColor: '#cd3030' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
            <i className="fa-solid fa-boxes-stacked" />
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
          <Link to="/Login" className="but_menu">
            <i className="fa-regular fa-circle-xmark" />
            <label htmlFor="btn-modal">
              Cerrar sesión
            </label>
          </Link>
        </li></ul>
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
    <input type="checkbox" id="btn-modal-añadir" />
    <div className="container-modal-añadir">
      <div className="content-modal-añadir">
        <h2>Registrar Devolucion</h2>
        <div>
          <form form ref={myFormRef} className="formulario">
            <div className="f1">
              <select name="id_producto" className="in" required>
                  <option value="" disabled selected>Selecciona un producto</option>
                  {producto.map((item) => (
                  <option key={item.id_producto} value={item.id_producto}>
                      {item.nom_producto}
                  </option>
                  ))}
              </select>
              <input type="search" name="unidades" className="in" placeholder="unidades :" required="required" />
              <select name="id_entrada" className="in" required>
                  <option value="" disabled selected>Selecciona una entrada de mercancia</option>
                  {entradas.map((item) => (
                  <option key={item.id_entrada} value={item.id_entrada}>
                      {item.id_entrada}
                  </option>
                  ))}
              </select>
              <button type="button" onClick={handleCrearDevolucion}>Registrar</button>
            </div>
          </form> 
        </div>
      </div>
      <label htmlFor="btn-modal-añadir" className="cerrar-modal-añadir" />
    </div>
    
    <section id="cont_table">
      <div className="cont">
        <h2 className="title"> Devoluciones</h2>   
        <div className="but_cont">
          <section id="ag_prod">
            <a href="#" id="but_ag"><label htmlFor="btn-modal-añadir">
                Registrar Nueva Devolucion
              </label></a>
          </section>
          <section id="ag_prod">
            <a href="#" id="but_ag" onClick={getPdf}>Generar informe</a>
          </section>
        </div>
        <section>
          {/*Fin de Ventana Modal*/}
          <section>
            <div id="div_buscador">
                    <img src="../img/Lupa.png" alt="Lupa" />
                    <input type="text" id="buscador" placeholder="Busca alguna devolución:" value={searchTerm} onChange={handleBuscar} />
            </div>
            <table className="table table-striped">
            
              <thead className="table-dark">
                <tr>
                  <th scope="col">id_devolucion</th>
                  <th scope="col">producto</th>
                  <th scope="col">unidades</th>
                  <th scope="col">id entrada</th>
                </tr>
              </thead>
              <tbody>
              {devolucion.filter(item =>
                item.id_devolucion.toString().includes(searchTerm) ||
                item.producto.nom_producto.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.unidades.toString().includes(searchTerm) ||
                item.id_entrada.toString().includes(searchTerm) 
              ).map( (item)=>(
                  <tr key={item.id_devolucion}>
                  <th scope="row">{item.id_devolucion}</th>
                  <td>{item.producto.nom_producto}</td>
                  <td>{item.unidades}</td>
                  <td>{item.id_entrada}</td>
                  </tr>
              ))}
              </tbody></table>
          </section>
        </section>
      </div></section></main>
  <div className="pqrs">
    <i className="fa-solid fa-circle-exclamation fa-beat" />
  </div>
  <footer id="foot">
    <p id="derechos">J&amp;M D.S - Todos los derechos reservados</p>
  </footer>
</div>

    
        );
}
export default Devolucion;