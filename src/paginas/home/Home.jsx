import "./style.css";
import Tabela from "../../componentes/tabela/Tabela";
import CardCobrancas from "../../componentes/cardCobrancas/CardCobrancas.jsx";
import pagas from "../../assets/tiposDeCobrancas/pagas.svg";
import previstas from "../../assets/tiposDeCobrancas/previstas.svg";
import vencidas from "../../assets/tiposDeCobrancas/vencidas.svg";
import PerfilUsuario from "../../componentes/headerCobrancasEClientes/perfilUsuario";
import useUsersList from "../../hooks/useUsersList";

function Home() {
  const { listaClientes, listarCobrancas } = useUsersList();

  const arrayCobrancasPagas = listarCobrancas.filter(
    (x) => x.status.trim() === "Paga"
  );
  const arrayCobrancasPendentes = listarCobrancas.filter(
    (x) => x.status.trim() === "Pendente"
  );

  const arrayCobrancasVencidas = listarCobrancas.filter(
    (x) => x.status === "Vencida"
  );
  const arrayClientesEmDia = listaClientes.filter(
    (x) => x.status.trim() === "Em Dia"
  );
  const arrayClientesInadimplentes = listaClientes.filter(
    (x) => x.status.trim() === "Inadimplente"
  );
  const valorTotalPagas = arrayCobrancasPagas.reduce(
    (acumulador, atual) => acumulador + atual.valor,
    0
  );
  const valorTotalPendentes = arrayCobrancasPendentes.reduce(
    (acumulador, atual) => acumulador + atual.valor,
    0
  );
  const valorTotalVencidas = arrayCobrancasVencidas.reduce(
    (acumulador, atual) => acumulador + atual.valor,
    0
  );

  return (
    <div className="homeContainer">
      <div className="header">
        <h2 className="tituloPrincipal">Resumo das cobranças</h2>
        <PerfilUsuario />
      </div>
      <hr />
      <div className="contemCardsCobrancas">
        <CardCobrancas
          tipoCobranca="Pagas"
          valor={valorTotalPagas}
          imagem={pagas}
        />
        <CardCobrancas
          tipoCobranca="Vencidas"
          valor={valorTotalVencidas}
          imagem={vencidas}
        />
        <CardCobrancas
          tipoCobranca="Previstas"
          valor={valorTotalPendentes}
          imagem={previstas}
        />
      </div>
      <div className="contemTabelasCobrancas">
        <Tabela
          tipoTabela="cobrancas"
          tipoCobranca="Pagas"
          conteudoTabela={arrayCobrancasPagas}
          primeiraTabela={true}
        />
        <Tabela
          tipoTabela="cobrancas"
          tipoCobranca="Vencidas"
          conteudoTabela={arrayCobrancasVencidas}
        />
        <Tabela
          tipoTabela="cobrancas"
          tipoCobranca="Previstas"
          conteudoTabela={arrayCobrancasPendentes}
        />
      </div>
      <div className="contemTabelasClientes">
        <Tabela
          tipoTabela="clientes"
          tipoCliente="em_dia"
          conteudoTabela={arrayClientesEmDia}
          primeiraTabela={true}
        />
        <Tabela
          tipoTabela="clientes"
          tipoCliente="Inadimplentes"
          conteudoTabela={arrayClientesInadimplentes}
        />
      </div>
    </div>
  );
}

export default Home;
