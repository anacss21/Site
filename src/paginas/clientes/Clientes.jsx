import "./style.css";
import useUsersList from "../../hooks/useUsersList";
import ModalCadastroCliente from "../../componentes/modais/modalCadastroCliente/ModalCadastroCliente";
import Tabelao from "../../componentes/tabelao/Tabelao.jsx";
import HeaderCobrancasEClientes from "../../componentes/headerCobrancasEClientes/HeaderCobrancasEClientes.jsx";
import DetalhesCliente from "../../paginas/clientes/detalhesDoCliente";

function Clientes() {
  const { modalCadastroClienteAberto, detalhesCliente, tipoModalCliente } =
    useUsersList();

  return (
    <div className={`containerPaginaClientes`}>
      <HeaderCobrancasEClientes estouEm="clientes" />
      {
        detalhesCliente ?
          <DetalhesCliente /> :
          <Tabelao />
      }
      {modalCadastroClienteAberto && (
        <ModalCadastroCliente funcionaComo={tipoModalCliente} />
      )}
    </div>
  );
}

export default Clientes;
