import "./App.css";
import { React } from "react";
import Cadastro from "./paginas/Cadastro/cadastro";
import Login from "./paginas/Login/login";
import PaginaPrincipal from "./paginas/paginaPrincipal/paginaPrincipal";
import { Routes, Route } from "react-router-dom";
import NaoEncontrado from "./componentes/naoEncontrado/naoEncontrado";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/cadastro" exact element={<Cadastro />} />
      <Route path="/home" exact element={<PaginaPrincipal />} />
      <Route path="/clientes" exact element={<PaginaPrincipal />} />
      <Route path="/cobrancas" exact element={<PaginaPrincipal />} />
      <Route path="*" exact element={<NaoEncontrado />} />
    </Routes>
  );
}
export default App;
