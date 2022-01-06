import "./style.css";
import editarCliente from "../../assets/clientes/editarCliente.svg";
import ordenador from "../../assets/tabelao/ordenador.svg";
import ModalCadastrarCobranca from "../../componentes/modais/modalCobrancas/modal";
import ModalCadastroCliente from "../../componentes/modais/modalCadastroCliente/ModalCadastroCliente";
import editaTabelao from "../../assets/tabelao/editaTabelao.svg";
import excluiTabelao from "../../assets/tabelao/excluiTabelao.svg";
import ModalExcluirCobranca from "../../componentes/modais/modalExcluirCobrancas/modal";
import useUsersList from "../../hooks/useUsersList";
import { useState } from "react";

function DetalhesDoCliente() {
  const {
    cliente,
    cobrancasCliente,
    setModalCadastroCobranca,
    modalCadastroCobranca,
    modalCadastroClienteAberto,
    setDadosCobranca,
    dadosCobranca,
    handleAbreCadastroCliente,
    setAtualizarCobranca,
    setModalExcluirCobranca,
    modalExcluirCobranca,
    setExcluirCobranca,
    paginaAtualDetalhes,
    setPaginaAtualDetalhes,
    setModalEditarCobranca,
    modalEditarCobranca,
    setCobrancasCliente
  } = useUsersList();
  const quantidadePorPaginaDetalhes = 4;

  const [ordenar, setOrdenar] = useState({
    ordemDatasAsc: false,
    ordemIdAsc: false,
  });

  const handlePassaPaginaDetalhes = () => {
    if (paginaAtualDetalhes <= quantidadePorPaginaDetalhes && paginaAtualDetalhes > cobrancasCliente.length / quantidadePorPaginaDetalhes) {
      return;
    }
    if (paginaAtualDetalhes >= quantidadePorPaginaDetalhes && paginaAtualDetalhes * quantidadePorPaginaDetalhes >= cobrancasCliente.length) {
      return;
    }
    if (quantidadePorPaginaDetalhes * paginaAtualDetalhes === cobrancasCliente.length) {
      return
    }
    setPaginaAtualDetalhes(paginaAtualDetalhes + 1);
  };
  const handleVoltaPaginaDetalhes = () => {
    if (paginaAtualDetalhes === 1) {
      setPaginaAtualDetalhes(1);
    } else {
      setPaginaAtualDetalhes(paginaAtualDetalhes - 1);
    }
  };

  const handleOrdenarData = () => {
    setPaginaAtualDetalhes(1);

    const datasOrdenadas = cobrancasCliente.sort((a, b) => {
      const dataA = new Date(a.vencimento);
      const dataB = new Date(b.vencimento);
      return ordenar.ordemDatasAsc
        ? dataB - dataA
        : dataA - dataB;
    });
    setCobrancasCliente(datasOrdenadas);
    setOrdenar({ ordemIdAsc: true, ordemDatasAsc: !ordenar.ordemDatasAsc });
  };

  const handleOrdenarId = () => {
    setPaginaAtualDetalhes(1);

    const valueOrdenados = cobrancasCliente.sort((a, b) => {
      const valueA = a.cobranca_id;
      const valueB = b.cobranca_id;
      return ordenar.ordemIdAsc ? valueA - valueB : valueB - valueA;
    });
    setCobrancasCliente(valueOrdenados);
    setOrdenar({ ordemDatasAsc: false, ordemIdAsc: !ordenar.ordemIdAsc });
  };
  return (
    <div className="detalhesDoCliente">
      <div className="containerClienteCobranca">
        <div className="containerCliente">
          <div className="dadosClientePessoal">
            <h2>Dados do cliente</h2>
            <div
              onClick={() => handleAbreCadastroCliente()}
              className="editarCliente"
            >
              <img src={editarCliente} alt="" />
              <p>Editar Cliente</p>
            </div>
          </div>
          <table className="dadosClienteTabela">
            <thead className="dadosClienteTabelaLinha">
              <tr className="block">
                <th className="th_tituloDetalhe">E-mail</th>
                <th className="th">{cliente.email}</th>
              </tr>
              <tr className="block2">
                <th className="th_tituloDetalhe">Telefone</th>
                <th className="th">{`(${String(cliente.telefone).slice(0, 2)}) ${String(cliente.telefone).slice(2)}`}</th>
              </tr>
              <tr className="block3">
                <th className="th_tituloDetalhe">CPF</th>
                <th className="th">{cliente.cpf}</th>
              </tr>
            </thead>
            <thead className="dadosClienteTabelaLinha2">
              <tr className="blockDetalhes">
                <td className="th_tituloDetalhe">Endereço</td>
                <td className="th">{cliente.logradouro}</td>
              </tr>
              <tr className="blockDetalhes">
                <td className="th_tituloDetalhe">Bairro</td>
                <td className="th">{cliente.bairro}</td>
              </tr>
              <tr className="blockDetalhes">
                <td className="th_tituloDetalhe">Complemento</td>
                <td className="th">{cliente.complemento}</td>
              </tr>
              <tr className="blockDetalhes">
                <td className="th_tituloDetalhe">Cep</td>
                <td className="th">{cliente.cep}</td>
              </tr>
              <tr className="blockDetalhes">
                <td className="th_tituloDetalhe">Cidade</td>
                <td className="th">{cliente.cidade}</td>
              </tr>
              <tr className="blockDetalhes">
                <td className="th_tituloDetalhe">UF</td>
                <td className="th">{cliente.estado}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="containerCobranca">
          <div className="dadosCobrancaPessoal">
            <h2>Cobranças do Cliente</h2>
            <div
              onClick={() => {
                setModalCadastroCobranca(true);
                setDadosCobranca({
                  ...dadosCobranca,
                  cliente_id: parseInt(cliente.id),
                });
              }}
              className="novaCobranca"
            >
              <p>+Nova cobrança</p>
            </div>
          </div>
          <table className="dadosCobrancaTabela">
            <hr className="efeitoLinhaTabela" />
            <thead className="dadosCobrancaTabelaLinha">
              <tr className="header">
                <th className="atributoTabela">
                  <img onClick={handleOrdenarId} src={ordenador} alt="" /> ID Cob.
                </th>
                <th className="atributoTabelao">
                  <img onClick={handleOrdenarData} src={ordenador} alt="" /> Data de venc.
                </th>
                <th className="atributoTabela">Valor</th>
                <th className="atributoTabela">Status</th>
                <th className="atributoTabela"> Descrição </th>
                <th className="atributoTabela"> </th>
              </tr>
              {cobrancasCliente.map((item, indice) => {
                if (
                  indice >= (paginaAtualDetalhes - 1) * quantidadePorPaginaDetalhes &&
                  indice < paginaAtualDetalhes * quantidadePorPaginaDetalhes
                ) {
                  return (
                    <tr className="headerCobrancasCliente">
                      <td className="itemTabelao">{item.cobranca_id}</td>
                      <td className="itemTabelao">
                        {new Date(item.vencimento)
                          .toLocaleDateString("pt-BR", { timeZone: "UTC" })
                          .replace(" 00:00:00", "")}
                      </td>
                      <td className="itemTabelao">{`R$ ${(item.valor / 100)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}`}</td>
                      <td className="itemTabelao">
                        <span
                          className={
                            item.status.trim() === "Paga"
                              ? "pagoDetalhamento "
                              : item.status.trim() === "Pendente"
                                ? "pendenteDetalhamento"
                                : "vencidoDetalhamento"
                          }
                        >
                          {item.status.trim()}
                        </span>
                      </td>
                      <td className="itemTabelao">{item.descricao}</td>
                      <td className="itemTabelao">
                        <div className="contemEditaExcluiTabelao">
                          <img
                            src={editaTabelao}
                            onClick={() => {
                              setModalEditarCobranca(true);
                              setDadosCobranca({
                                valor: item.valor / 100,
                                descricao: item.descricao,
                                vencimento: new Date(item.vencimento)
                                  .toLocaleDateString("pt-BR", {
                                    timeZone: "UTC",
                                  })
                                  .replace(" 00:00:00", "")
                                  .split("/")
                                  .reverse()
                                  .join("-"),
                                cobranca_id: item.cobranca_id,
                                cliente_id: parseInt(item.cliente_id),
                              });
                              setAtualizarCobranca(item);
                            }}
                            className="editaTabelao"
                            alt=""
                          />
                          <img
                            src={excluiTabelao}
                            onClick={() => {
                              setModalExcluirCobranca(true);
                              setExcluirCobranca(item);
                              setDadosCobranca({
                                cliente_id: parseInt(item.cliente_id),
                                cobranca_id: item.cobranca_id,
                                status: "",
                              });
                            }}
                            alt=""
                          />
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  return <></>;
                }
              })}
            </thead>
            {cobrancasCliente.length === 0 && (
              <div className="conteudoTabelaoVazio" />
            )}
            <div className="contemPaginas">
              <span className="botaoPagina" onClick={handleVoltaPaginaDetalhes}>
                Anterior
              </span>
              <span className="paginaAtual">{paginaAtualDetalhes}</span>
              <span className="botaoPagina" onClick={handlePassaPaginaDetalhes}>
                Proximo
              </span>
            </div>
          </table>
        </div>
      </div>
      {modalCadastroClienteAberto && <ModalCadastroCliente editando="true" />}
      {modalExcluirCobranca && (
        <ModalExcluirCobranca dadosCobranca={dadosCobranca} />
      )}
      {modalCadastroCobranca && <ModalCadastrarCobranca />}
      {modalEditarCobranca && (
        <ModalCadastrarCobranca
          editandoCobranca={"cobranca"}
          dadosCobranca={dadosCobranca}
        />
      )}
    </div>
  );
}

export default DetalhesDoCliente;
