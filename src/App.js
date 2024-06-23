import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './components/Index';
import Login from './components/Login';
import Indexadm from './components/Indexadm';
import Indexven from './components/Indexven';
import VentasA from './components/VentasA';
import VentasV from './components/VentasV';
import ProductosA from './components/ProductosA';
import ProductosV from './components/ProductosV';
import Proveedores from './components/Proveedores';
import Mercancia  from './components/Mercancia';
import Vendedor1 from './components/Vendedor1';
import Vendedor2 from './components/Vendedor2';
import Vendedor3 from './components/Vendedor3';
import Usuarios from './components/Usuarios';
import Devolucion from './components/devolucion';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Indexadm" element={<Indexadm />} />
          <Route path="/Indexven" element={<Indexven />} />
          <Route path="/VentasA" element={<VentasA/>} />
          <Route path="/VentasV" element={<VentasV />} />
          <Route path="/ProductosA" element={<ProductosA />} />
          <Route path="/ProductosV" element={<ProductosV />} />
          <Route path="/Proveedores" element={<Proveedores />} />
          <Route path="/Mercancia" element={<Mercancia />} />
          <Route path="/vendedor1" element={<Vendedor1 />} />
          <Route path="/vendedor2" element={<Vendedor2 />} />
          <Route path="/vendedor3" element={<Vendedor3 />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/devolucion" element={<Devolucion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
