import "../modalCobrancas/style.css";
import CobrarIcone from "../../../assets/modais/cobrarIcone.svg";
import fechar from "../../../assets/modais/fechar.svg";
import useUsersList from "../../../hooks/useUsersList";

function ModalCobranca({ editandoCobranca }) {
  const {
    setModalCadastroCobranca,
    cliente,
    handleCriarCobranca,
    dadosCobranca,
    setDadosCobranca,
    setDetalhesCliente,
    setNomeClienteInput,
    setEmailClienteInput,
    setCpfClienteInput,
    setTelefoneClienteInput,
    setEndereçoClienteInput,
    setComplementoClienteInput,
    setCepClienteInput,
    setBairroClienteInput,
    setCidadeClienteInput,
    setUfClienteInput,
    detalhesCliente,
    setModalEditarCobranca,
    handleUpdateCobranca,
    setAtualizarCobranca,
  } = useUsersList();

  const handleOnChange = (input, event) => {
    if (input === "descricaoCobranca" || input === "descricaoEditarCobranca") {
      setDadosCobranca({ ...dadosCobranca, descricao: event.target.value });
    }
    if (input === "vencimentoValorInput" || input === "editarVencimento") {
      setDadosCobranca({ ...dadosCobranca, vencimento: event.target.value });
    }
    if (input === "vencimentoValorInputValor" || input === "editarValor") {
      setDadosCobranca({
        ...dadosCobranca,
        valor: event.target.value.replace(/[,]/g, ".").replace(/[^\d.]/g, ""),
      });
    }
  };

  const handleOnClick = (input, event) => {
    if (input === "radio1") {
      setDadosCobranca({ ...dadosCobranca, status: event.target.value });
    }
    if (input === "radio2") {
      setDadosCobranca({ ...dadosCobranca, status: event.target.value });
    }
  };

  const handleCancelaCadastroCobranca = () => {
    setDadosCobranca({
      ...dadosCobranca,
      valor: "",
      descricao: "",
      vencimento: "",
      status: "",
    });
    if (!detalhesCliente) {
      setDetalhesCliente(false);
      setNomeClienteInput("");
      setEmailClienteInput("");
      setCpfClienteInput("");
      setTelefoneClienteInput("");
      setEndereçoClienteInput("");
      setComplementoClienteInput("");
      setCepClienteInput("");
      setBairroClienteInput("");
      setCidadeClienteInput("");
      setUfClienteInput("");
    }
  };

  const handleBlur = (valor, id, id2) => {

    if (valor === ("editarVencimento" || "vencimentoValorInput") && dadosCobranca.vencimento.replace(/\D/g, "").length < 8) {
      document.getElementById(id).style.border = "1px solid #E70000";
      document.getElementById(id2).textContent =
        "Este campo deve ser preenchido";
      return;
    }

    if (!valor) {
      document.getElementById(id).style.border = "1px solid #E70000";
      document.getElementById(id2).textContent =
        "Este campo deve ser preenchido";
    }
    if (valor) {
      document.getElementById(id).style.border = "1px solid #D0D5DD";
      document.getElementById(id2).textContent = "";
    }
  };

  const handleEditarCriar = () => {
    if (editandoCobranca === "cobranca") {
      setModalEditarCobranca(false);
      return;
    } else {
      setModalCadastroCobranca(false);
      return;
    }
  };

  const handleAplicar = () => {
    if (editandoCobranca === "cobranca") {
      handleUpdateCobranca(dadosCobranca.cobranca_id);

      return;
    } else {
      handleCriarCobranca(cliente.id);
      return;
    }
  };

  return (
    <div className="fundoModalCobranca">
      <div className="modalCadastroCobranca">
        <img
          className="fechaModalCadastroCobranca"
          src={fechar}
          alt="x"
          onClick={() => handleEditarCriar()}
        />
        <div className="informacaoCobranca">
          <h2 className="titulo">
            <img className="cobrancaIcone" src={CobrarIcone} alt="x" />
            {editandoCobranca ? "Editar Cobrança" : "Cadastro de Cobrança"}
          </h2>
          <div className="dadosCobranca_nome">
            <label for="nome"> Nome* </label>
            <input
              disabled
              className="nome"
              type="text"
              value={cliente.nome}
            ></input>
          </div>
          <div className="dadosCobranca_descricao">
            <label for={
              editandoCobranca === "cobranca"
                ? "descricaoEditarCobranca"
                : "descricaoCobranca"
            }> Descrição* </label>
            <input
              id={
                editandoCobranca === "cobranca"
                  ? "descricaoEditarCobranca"
                  : "descricaoCobranca"
              }
              onChange={(event) =>
                handleOnChange(editandoCobranca === "cobranca"
                  ? "descricaoEditarCobranca"
                  : "descricaoCobranca", event)
              }
              value={dadosCobranca.descricao}
              className="descricaoCobrancaInput"
              type="text"
              placeholder="Digite a descrição"
              onBlur={() =>
                handleBlur(
                  dadosCobranca.descricao,
                  editandoCobranca === "cobranca"
                    ? "descricaoEditarCobranca"
                    : "descricaoCobranca",
                  editandoCobranca === "cobranca"
                    ? "spanEditarDescricaoCobranca"
                    : "spanDescricaoCobranca"
                )
              }
            ></input>
            <span
              id={
                editandoCobranca === "cobranca"
                  ? "spanEditarDescricaoCobranca"
                  : "spanDescricaoCobranca"
              }
              className="alerta"
            ></span>
          </div>
          <div className="dadosCobrancaVencimentoValor">
            <div className="dadosCobranca">
              <label for={
                editandoCobranca === "cobranca"
                  ? "editarVencimento"
                  : "vencimentoValorInput"
              }> Vencimento:* </label>
              <input
                id={
                  editandoCobranca === "cobranca"
                    ? "editarVencimento"
                    : "vencimentoValorInput"
                }
                onChange={(event) =>
                  handleOnChange(editandoCobranca === "cobranca"
                    ? "editarVencimento"
                    : "vencimentoValorInput", event)
                }
                value={dadosCobranca.vencimento}
                className="vencimentoValorInput"
                type="date"
                placeholder="Data de Vencimento"
                onBlur={() =>
                  handleBlur(
                    dadosCobranca.vencimento,
                    editandoCobranca === "cobranca"
                      ? "editarVencimento"
                      : "vencimentoValorInput",
                    editandoCobranca === "cobranca"
                      ? "spanEditarVencimento"
                      : "spanVencimento"
                  )
                }
              ></input>
              <span
                id={
                  editandoCobranca === "cobranca"
                    ? "spanEditarVencimento"
                    : "spanVencimento"
                }
                className="alerta"
              ></span>
            </div>
            <div className="dadosCobranca">
              <label for={
                editandoCobranca === "cobranca"
                  ? "editarValor"
                  : "vencimentoValorInputValor"
              }> Valor:* </label>
              <input
                id={
                  editandoCobranca === "cobranca"
                    ? "editarValor"
                    : "vencimentoValorInputValor"
                }
                onChange={(event) =>
                  handleOnChange(editandoCobranca === "cobranca"
                    ? "editarValor"
                    : "vencimentoValorInputValor", event)
                }
                value={dadosCobranca.valor}
                className="vencimentoValorInputValor"
                type="text"
                placeholder="Digite o valor"
                onBlur={() =>
                  handleBlur(
                    dadosCobranca.valor,
                    editandoCobranca === "cobranca"
                      ? "editarValor"
                      : "vencimentoValorInputValor",
                    editandoCobranca === "cobranca"
                      ? "spanEditarValor"
                      : "spanValor"
                  )
                }
              ></input>
              <span
                id={
                  editandoCobranca === "cobranca"
                    ? "spanEditarValor"
                    : "spanValor"
                }
                className="alerta"
              ></span>
            </div>
          </div>
          <div className="checkListCobrar">
            <label className="status">Status*</label>
            <div className="checkList">
              <div className="labelInputChecklist">
                <input
                  onClick={(event) => handleOnClick("radio1", event)}
                  value={"Paga"}
                  id="radio1"
                  className="inputRadio"
                  name="input"
                  type="radio"
                />
                <label htmlFor="radio1" className="labelInput"></label>
                <span>Cobrança Paga</span>
              </div>
              <div className="labelInputChecklist">
                <input
                  onClick={(event) => handleOnClick("radio2", event)}
                  value={"Pendente"}
                  id="radio2"
                  className="inputRadio"
                  name="input"
                  type="radio"
                />
                <label htmlFor="radio2" className="labelInput"></label>
                <span>Cobrança Pendente</span>
              </div>
            </div>
          </div>
          <div className="btnCobranca">
            <button
              className="btnCancelar"
              onClick={() => {
                setModalCadastroCobranca(false);
                handleCancelaCadastroCobranca();
              }}
            >
              Cancelar
            </button>

            <button
              className="btnAplicar"
              onClick={() => {
                handleAplicar();
                setAtualizarCobranca([]);
              }}
            >
              Aplicar{" "}
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ModalCobranca;
