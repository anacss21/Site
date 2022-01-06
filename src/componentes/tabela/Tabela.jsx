import "./style.css";
import useUsersList from "../../hooks/useUsersList";

function Tabela({
  tipoTabela,
  tipoCobranca,
  tipoCliente,
  conteudoTabela,
  primeiraTabela,
}) {
  const {
    setMenuSelecionado,
    setDetalhesCliente,
    setTempPesquisa,
    setTemp,
    setTipoTabelao,
  } = useUsersList();
  const estiloTabelaCobrancas = {
    width: "360px",
  };
  const estiloTabelaClientes = {
    width: "556px",
  };

  return (
    <div
      style={
        tipoTabela === "cobrancas"
          ? estiloTabelaCobrancas
          : estiloTabelaClientes
      }
      className={
        primeiraTabela ? "containerTabela primeiraTabela" : "containerTabela"
      }
    >
      <div className="headerTabela">
        <h2>
          {tipoTabela === "cobrancas"
            ? `Cobranças ${tipoCobranca}`
            : `Clientes ${tipoCliente.replace("_", " ")}`}
        </h2>
        <span
          className={
            tipoTabela === "cobrancas"
              ? `quantidade${tipoCobranca}`
              : `quantidade${tipoCliente}`
          }
        >
          {conteudoTabela.length}
        </span>
      </div>
      <table border="0">
        <thead>
          <hr className="efeitoLinha" />
          <tr>
            <th>Cliente</th>
            <th>{tipoTabela === "cobrancas" ? `ID da cob.` : "ID do clie."}</th>
            <th>{tipoTabela === "cobrancas" ? "Valor" : "CPF"}</th>
          </tr>
        </thead>
        <tbody
          className={
            conteudoTabela.length === 0
              ? "conteudoTabelaVazio"
              : "conteudoTabela"
          }
        >
          {conteudoTabela.length === 0 ? (
            <p className="nada">Não há nada aqui</p>
          ) : (
            conteudoTabela.map((dado, indice) => {
              if (indice <= 3) {
                return (
                  <>
                    <hr className="efeitoLinha" />
                    <tr>
                      <td className="itemTabela">
                        {tipoTabela === "cobrancas"
                          ? dado.nome.trim()
                          : dado.nome}
                      </td>
                      <td className="itemTabela">
                        {tipoTabela === "cobrancas"
                          ? dado.cobranca_id
                          : dado.id}
                      </td>
                      <td className="itemTabela">
                        {tipoTabela === "cobrancas"
                          ? `R$ ${(dado.valor / 100)
                              .toFixed(2)
                              .toString()
                              .replace(".", ",")}`
                          : dado.cpf}
                      </td>
                    </tr>
                  </>
                );
              } else {
                return <></>;
              }
            })
          )}
        </tbody>
        <hr className="efeitoLinha" />
      </table>
      <div className="footerTabela">
        <span
          onClick={() => {
            setTipoTabelao(tipoTabela);
            setTemp(conteudoTabela);
            setTempPesquisa(conteudoTabela);
            setDetalhesCliente(false);
            setMenuSelecionado(tipoTabela);
          }}
        >
          Ver todos
        </span>
      </div>
    </div>
  );
}

export default Tabela;
