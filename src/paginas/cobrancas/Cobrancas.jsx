import "./style.css";
import Tabelao from "../../componentes/tabelao/Tabelao";
import HeaderCobrançaCliente from "../../componentes/headerCobrancasEClientes/HeaderCobrancasEClientes";

function Cobrancas() {

  return (
    <div>
      <div>
        <HeaderCobrançaCliente />
      </div>
      <Tabelao />
    </div>
  );
}

export default Cobrancas;
