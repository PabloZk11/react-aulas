import { Link } from 'react-router-dom';
import './css/Mercancia.css'; 
import React, {useState, useEffect} from 'react';
import  axios  from 'axios';
import { useRef } from 'react';

const Usuarios = () => {

  const url="https://laravel-production-fb9e.up.railway.app/api/usuario";
  const urlP="https://laravel-production-fb9e.up.railway.app/api/usuario-pdf";
  const [usuario,setUsuario] = useState([])
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const myFormRef = useRef(null);

  useEffect(()=>{
    getUsuario();
  },[]);

  const getUsuario = async ()=>{
      try {
          const respuesta = await axios.get(url);
          setUsuario(respuesta.data.data);
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
  

  const handleCrearUsuarios = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario
  
    const formData = new FormData(myFormRef.current); // Suponiendo que tienes un formulario con una referencia
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const contrasena = formData.get('contrasena');
    const id_rol = formData.get('id_rol');
    const id_documento = formData.get('id_documento');

  
    const productData = {
        nombre: nombre,
        email: email,
        contrasena: contrasena,
        id_rol: id_rol,
        id_documento: id_documento
        
      };
  
    enviarDatosUsuario(productData);
  };
  
  const enviarDatosUsuario = async (productData) => { // Define la función enviarDatosProducto
    try {
      const respuesta = await axios.post(url, productData);
      console.log('Usuario registrado exitosamente:', respuesta.data);
      setSuccessMessage("El usuario se registro exitosamente.");
      alert("usuario registrado correctamente");
      myFormRef.current.reset();
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert("error al registrar el usuario");
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
        <h2>Registrar Usuarios</h2>
        <div>
          <form form ref={myFormRef} className="formulario">
            <div className="f1">
              <input type="search" name="nombre" className="in" placeholder="nombre :" required="required" />
              <input type="search" name="email" className="in" placeholder="email :" required="required" />
              <input type="search" name="contrasena" className="in" placeholder="contrasena:" required="required" />
              <input type="search" name="id_rol" className="in" placeholder="rol (1 = admin | 2 = vendedor):" required="required" />
              <input type="search" name="id_documento" className="in" placeholder="documento (1 = CC | 2 = TI):" required="required" />
              <button type="button" onClick={handleCrearUsuarios}>Registrar</button>
            </div>
          </form> 
        </div>
      </div>
      <label htmlFor="btn-modal-añadir" className="cerrar-modal-añadir" />
    </div>
    
    <section id="cont_table">
      <div className="cont">
        <h2 className="title"> Usuarios</h2>   
        <div className="but_cont">
          <section id="ag_prod">
            <a href="#" id="but_ag"><label htmlFor="btn-modal-añadir">
                Registrar Nuevo Usuario
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
                <img src="../img/Lupa.png" alt />
                <input type="text" id="buscador" placeholder="Buscar usuario:" value={searchTerm} onChange={handleBuscar} />
            </div>
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">id_usuario</th>
                  <th scope="col">nombre</th>
                  <th scope="col">email</th>
                  <th scope="col">rol_usuario</th>
                  <th scope="col">tipo_documento</th>
                </tr>
              </thead>
              <tbody>
              {usuario.filter(item =>
                      item.id_usuario.toString().includes(searchTerm)||
                      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.roles.nombre_rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.documento_ident.tipo_documento.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ).map((item) => (
                      <tr key={item.id_usuario}>
                        <th scope="row">{item.id_usuario}</th>
                        <td>{item.nombre}</td>
                        <td>{item.email}</td>
                        <td>{item.roles.nombre_rol}</td>
                        <td>{item.documento_ident.tipo_documento}</td>
                     </tr>
                    ))}
              </tbody></table>
          </section>
        </section>
      </div></section></main>
  <footer id="foot">
    <p id="derechos">J&amp;M D.S - Todos los derechos reservados</p>
  </footer>
</div>

    
        );
}
export default Usuarios;
