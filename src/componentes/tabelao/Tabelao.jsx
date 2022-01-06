import "./style.css";
import adicionaCobranca from "../../assets/tabelao/adicionaCobranca.svg";
import ordenador from "../../assets/tabelao/ordenador.svg";
import editaTabelao from "../../assets/tabelao/editaTabelao.svg";
import excluiTabelao from "../../assets/tabelao/excluiTabelao.svg";
import ModalCadastrarCobranca from "../modais/modalCobrancas/modal";
import ModalDetalhesCobranca from "../modais/modalCobrancas/modalDetalhes";
import ExcluirCobranca from "../modais/modalExcluirCobrancas/modal";
import { useState } from "react";
import useUsersList from "../../hooks/useUsersList";

function Tabelao() {
  const {
    handleAcharCliente,
    handleListarCobrancasCliente,
    setDetalhesCliente,
    setModalCadastroCobranca,
    setDadosCobranca,
    dadosCobranca,
    modalCadastroCobranca,
    setTemp,
    temp,
    tipoTabelao,
    setCliente,
    cliente,
    modalExcluirCobranca,
    setModalExcluirCobranca,
    setModalEditarCobranca,
    modalEditarCobranca,
    paginaAtual,
    setPaginaAtual,
    setAtualizarCobranca,
    setExcluirCobranca,
  } = useUsersList();
  const quantidadePorPaginaTabelao = 15;
  const [ordenar, setOrdenar] = useState({
    ordemNomesAsc: false,
    ordemIdAsc: false,
  });

  const handlePassaPagina = () => {
    if (paginaAtual <= quantidadePorPaginaTabelao && paginaAtual > temp.length / quantidadePorPaginaTabelao) {
      return;
    }
    if (paginaAtual >= quantidadePorPaginaTabelao && paginaAtual * quantidadePorPaginaTabelao >= temp.length) {
      return;
    }
    if (quantidadePorPaginaTabelao * paginaAtual === temp.length) {
      return
    }
    setPaginaAtual(paginaAtual + 1);
  };
  const handleVoltaPagina = () => {
    if (paginaAtual === 1) {
      setPaginaAtual(1);
    } else {
      setPaginaAtual(paginaAtual - 1);
    }
  };
  const handleOrdenarNome = () => {
    setPaginaAtual(1);
    const lista = [...temp];

    const nomesOrdenados = lista.sort((a, b) => {
      const nomeA = a.nome.toLowerCase();
      const nomeB = b.nome.toLowerCase();
      return ordenar.ordemNomesAsc
        ? nomeB.localeCompare(nomeA)
        : nomeA.localeCompare(nomeB);
    });
    setTemp(nomesOrdenados);
    setOrdenar({ ordemIdAsc: true, ordemNomesAsc: !ordenar.ordemNomesAsc });
  };

  const handleOrdenarId = () => {
    setPaginaAtual(1);
    const lista = [...temp];

    const valueOrdenados = lista.sort((a, b) => {
      const valueA = a.cobranca_id;
      const valueB = b.cobranca_id;
      return ordenar.ordemIdAsc ? valueA - valueB : valueB - valueA;
    });
    setTemp(valueOrdenados);
    setOrdenar({ ordemNomesAsc: false, ordemIdAsc: !ordenar.ordemIdAsc });
  };

  const [modalDetalhesCobranca, setModalDetalhesCobranca] = useState(false);

  return (
    <div>
      <table className="tabelao" border="0">
        <thead className="headTabelao">
          <tr>
            <th className="atributoTabelao">
              <img
                className="ordenar"
                onClick={handleOrdenarNome}
                src={ordenador}
                alt=""
              />
              Cliente
            </th>
            <th className="atributoTabelao">
              {tipoTabelao === "cobrancas" ? (
                <img
                  className="ordenar"
                  onClick={handleOrdenarId}
                  src={ordenador}
                  alt=""
                />
              ) : (
                ""
              )}
              {tipoTabelao === "cobrancas" ? "ID Cob." : "CPF"}
            </th>
            <th className="atributoTabelao">
              {tipoTabelao === "cobrancas" ? "Valor" : "Email"}
            </th>
            <th className="atributoTabelao">
              {tipoTabelao === "cobrancas" ? "Data de venc." : "Telefone"}
            </th>
            <th className="atributoTabelao">Status</th>
            {tipoTabelao === "cobrancas" && (
              <th className="atributoTabelao">Descrição</th>
            )}
            <th className="atributoTabelao">
              {tipoTabelao === "cobrancas" ? "" : "Criar Cobrança"}
            </th>
          </tr>
        </thead>
        <tbody className="bodyTabelao">
          <hr className="efeitoLinhaTabelao" />

          {temp &&
            temp.map((data, indice) => {
              const handleAbrirModal = () => {
                setModalDetalhesCobranca(true);
                setCliente({
                  nome: data.nome,
                });
                setDadosCobranca({
                  valor: `R$ ${(data.valor / 100)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")}`,
                  descricao: data.descricao,
                  vencimento: new Date(data.vencimento)
                    .toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })
                    .replace(" 00:00:00", "")
                    .split("/")
                    .reverse()
                    .join("-"),
                  status: data.status,
                  cobranca_id: data.cobranca_id,
                  cliente_id: parseInt(data.id),
                });
              };
              if (
                indice >= (paginaAtual - 1) * quantidadePorPaginaTabelao &&
                indice < paginaAtual * quantidadePorPaginaTabelao
              ) {
                return (
                  <>
                    <tr>
                      <td
                        className="itemTabelao nomeclicavel"
                        onClick={
                          tipoTabelao === "clientes"
                            ? () => {
                              handleAcharCliente(data.id);
                              handleListarCobrancasCliente(data.id);
                              setDetalhesCliente(true);
                            }
                            : () => handleAbrirModal()
                        }
                      >
                        {data.nome}
                      </td>
                      <td
                        onClick={
                          tipoTabelao === "cobrancas"
                            ? () => handleAbrirModal()
                            : ""
                        }
                        className={`itemTabelao ${tipoTabelao === "clientes" ? "" : "nomeclicavel"}`}
                      >
                        {tipoTabelao === "cobrancas"
                          ? data.cobranca_id
                          : data.cpf}
                      </td>
                      <td
                        onClick={
                          tipoTabelao === "cobrancas"
                            ? () => handleAbrirModal()
                            : ""
                        }
                        className={`itemTabelao ${tipoTabelao === "clientes" ? "" : "nomeclicavel"}`}
                      >
                        {tipoTabelao === "cobrancas"
                          ? `R$ ${(data.valor / 100)
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")}`
                          : data.email}
                      </td>
                      <td
                        onClick={
                          tipoTabelao === "cobrancas"
                            ? () => handleAbrirModal()
                            : ""
                        }
                        className={`itemTabelao ${tipoTabelao === "clientes" ? "" : "nomeclicavel"}`}
                      >
                        {tipoTabelao === "cobrancas"
                          ? new Date(data.vencimento)
                            .toLocaleDateString("pt-BR", { timeZone: "UTC" })
                            .replace(" 00:00:00", "")
                          : `(${String(data.telefone).slice(0, 2)}) ${String(data.telefone).slice(2)}`}
                      </td>
                      <td className={`itemTabelao ${tipoTabelao === "clientes" ? "" : "nomeclicavel"}`}>
                        <span
                          onClick={
                            tipoTabelao === "cobrancas"
                              ? () => handleAbrirModal()
                              : ""
                          }
                          className={
                            tipoTabelao === "clientes"
                              ? data.status.trim() === "Inadimplente"
                                ? "inamdiplenteTabelao"
                                : "emDiaTabelao"
                              : data.status.trim() === "Paga"
                                ? "emDiaTabelao"
                                : data.status.trim() === "Pendente"
                                  ? "pendenteTabelao"
                                  : "inamdiplenteTabelao"
                          }
                        >
                          {data.status.trim()}
                        </span>
                      </td>
                      {tipoTabelao === "cobrancas" && (
                        <td
                          onClick={
                            tipoTabelao === "cobrancas"
                              ? () => handleAbrirModal()
                              : ""
                          }
                          className={`itemTabelao ${tipoTabelao === "clientes" ? "" : "nomeclicavel"}`}
                        >
                          {data.descricao}
                        </td>
                      )}
                      <td className="itemTabelao">
                        {tipoTabelao === "cobrancas" ? (
                          <div className="contemEditaExcluiTabelao">
                            <img
                              src={editaTabelao}
                              onClick={() => {
                                setModalEditarCobranca(true);
                                setCliente({
                                  nome: data.nome,
                                });
                                setDadosCobranca({
                                  valor: data.valor / 100,
                                  descricao: data.descricao,
                                  vencimento: new Date(data.vencimento)
                                    .toLocaleDateString("pt-BR", {
                                      timeZone: "UTC",
                                    })
                                    .replace(" 00:00:00", "")
                                    .split("/")
                                    .reverse()
                                    .join("-"),
                                  cobranca_id: data.cobranca_id,
                                  cliente_id: parseInt(data.id),
                                });
                                setAtualizarCobranca(data);
                              }}
                              className="editaTabelao"
                              alt="edita"
                            />
                            <img
                              src={excluiTabelao}
                              onClick={() => {
                                setModalExcluirCobranca(true);
                                setExcluirCobranca(data);
                                setDadosCobranca({
                                  cobranca_id: data.cobranca_id,
                                  status: "",
                                });
                              }}
                              alt="exclui"
                            />
                          </div>
                        ) : (
                          <img
                            src={adicionaCobranca}
                            onClick={() => {
                              setModalCadastroCobranca(true);
                              handleAcharCliente(data.id);
                              setDadosCobranca({
                                ...dadosCobranca,
                                cliente_id: parseInt(data.id),
                              });
                            }}
                            alt="adiciona cobrança"
                          />
                        )}
                      </td>
                    </tr>
                    <hr className="efeitoLinhaTabelao" />
                  </>
                );
              } else {
                return <></>;
              }
            })}
        </tbody>
        {modalCadastroCobranca && <ModalCadastrarCobranca />}
        {modalEditarCobranca && (
          <ModalCadastrarCobranca
            editandoCobranca={"cobranca"}
            dadosCobranca={dadosCobranca}
          />
        )}
        {modalExcluirCobranca && (
          <ExcluirCobranca dadosCobranca={dadosCobranca} />
        )}
        {temp.length === 0 && <div className="conteudoTabelaoVazio" />}
        <div className="contemPaginas">
          <span className="botaoPagina" onClick={handleVoltaPagina}>
            Anterior
          </span>
          <span className="paginaAtual">{paginaAtual}</span>
          <span className="botaoPagina" onClick={handlePassaPagina}>
            Proximo
          </span>
        </div>
        {modalDetalhesCobranca && (
          <ModalDetalhesCobranca
            cliente={cliente}
            dadosCobranca={dadosCobranca}
            handleFecharModal={() => setModalDetalhesCobranca()}
            setDadosCobranca={setDadosCobranca}
          />
        )}
      </table>
    </div>
  );
}

export default Tabelao;
