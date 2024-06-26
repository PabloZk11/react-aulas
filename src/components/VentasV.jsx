import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import './css/VentasV.css';
import  axios  from 'axios';
import { useRef } from 'react';


export const VentasV = () => {

  const url="http://apiaulas.test/api/salida";
  const [registro_salida,setRegistro_salidas] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const myFormRef = useRef(null);


  useEffect(()=>{
    getRegistro_salida();
  },[]);

  const getRegistro_salida = async ()=>{
    try {
        const respuesta = await axios.get(url);
        setRegistro_salidas(respuesta.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}



const handleCrearSalida = (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario

  const formData = new FormData(myFormRef.current); // Suponiendo que tienes un formulario con una referencia
  const unidades = formData.get('unidades');
  const id_factura_salida = formData.get('id_factura_salida');
  const id_producto = formData.get('id_producto');


  const productData = {
    unidades: unidades,
    id_factura_salida: id_factura_salida,
    id_producto: id_producto,
    };

    enviarDatosSalidas(productData);
};

const enviarDatosSalidas = async (productData) => { // Define la función enviarDatosProducto
  try {
    const respuesta = await axios.post(url, productData);
    console.log('Venta regsitrada exitosamente:', respuesta.data);
    setSuccessMessage("La venta se registro exitosamente.");
    myFormRef.current.reset();
    window.location.reload();
  } catch (error) {
    console.error('Error al crear al registrar la venta:', error);
    // Maneja errores durante la solicitud POST (por ejemplo, muestra un mensaje de error)
  }
};

const handleBuscar = (event) => {
  setSearchTerm(event.target.value);
};
  return (
    <div>
            <div className="simula-body-merc">
            <nav className="navbar" style={{ backgroundColor: '#cd3030' }}>
                <div className="container-fluid">
                <a className="navbar-brand" href="#">
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
          <Link to="/Vendedor1" className="but_menu">
            <i className="fa-sharp fa-solid fa-cart-shopping" />
            <label htmlFor="btn-modal-ventas">
              Inicio
            </label>
          </Link>
        </li>
        <li>
          <Link to="/ProductosV" className="but_menu">
            <i className="fas fa-server" />
            <label htmlFor="btn-modal-ventas">
              Productos
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
    {/*Ventana Modal Cierre Advertencia*/}
    <input type="checkbox" id="btn-modal-añadir" />
    <div className="container-modal-añadir">
      <div className="content-modal-añadir">
        <h2>Registrar Venta</h2>
        <div>
        <form form ref={myFormRef} className="formulario">
            <div className="f1">
              <input type="number" name="unidades" className="in" placeholder="unidades:" required="required" />
              <input type="number" name="id_factura_salida" className="in" placeholder="id_factura_salida:" required="required" />
              <input type="number" name="id_producto" className="in" placeholder="id_producto:" required="required" />
              <button type="button" onClick={handleCrearSalida}>Registrar</button>
            </div>
          </form> 
        </div>
        
      </div>
      <label htmlFor="btn-modal-añadir" className="cerrar-modal-añadir" />
    </div>
    {/*Fin de Ventana Modal Advertencia*/}
    <section id="cont_table">
      <div className="cont baja">
        <h2 className="title">Ventas</h2>   
        <div className="but_cont">
          <section id="ag_prod">
            <a href="#" id="but_ag"><label htmlFor="btn-modal-añadir">
                Añadir venta
              </label></a>
          </section>
          <section id="ag_prod">
            <a href="dsc/informe.docx" id="but_ag" download="Informe Ventas">Generar informe</a>
          </section>
          <section id="ag_prod">
            <a href="dsc/imprimir.pdf" id="but_ag" download="Ultima Venta">Imprimir última venta</a>
          </section>
        </div>
        <section>
          <div id="div_buscador">
                <img src="../img/Lupa.png" alt />
                <input type="text" id="buscador" placeholder="Buscar venta:" value={searchTerm} onChange={handleBuscar} />
          </div>
          <table className="table table-striped">
                    <thead className="table-dark">
            <tr>
                <th scope="col">id_salida</th>
                <th scope="col">unidades</th>
                <th scope="col">id_factura_salida</th>
                <th scope="col">id_producto</th>
            </tr>
            </thead>
            <tbody>
            {registro_salida.filter(item =>
                      item.id_salida.toString().includes(searchTerm) ||  
                      item.unidades.toString().includes(searchTerm)||
                      item.id_factura_salida.toString().includes(searchTerm)||
                      item.producto.nom_producto.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ).map((item) => (
                      <tr key={item.id_salida}>
                        <th scope="row">{item.id_salida}</th>
                        <td>{item.unidades}</td>
                        <td>{item.id_factura_salida}</td>
                        <td>{item.producto.nom_producto}</td>
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

export default VentasV;