import "./style.css";
import fechar from "../../../assets/modais/fechar.svg";
import clientesIcone from "../../../assets/clientes/clientesIcone.svg";
import useUsersList from "../../../hooks/useUsersList";
import InputMask from "react-input-mask";

function ModalCadastroCliente({ editando }) {
  const {
    setModalCadastroClienteAberto,
    token,
    setMensagem,
    setSucesso,
    handleMostraMensagem,
    setMostraMensagem,
    nomeClienteInput,
    setNomeClienteInput,
    emailClienteInput,
    setEmailClienteInput,
    cpfClienteInput,
    setCpfClienteInput,
    telefoneClienteInput,
    setTelefoneClienteInput,
    endereçoClienteInput,
    setEndereçoClienteInput,
    complementoClienteInput,
    setComplementoClienteInput,
    cepClienteInput,
    setCepClienteInput,
    bairroClienteInput,
    setBairroClienteInput,
    cidadeClienteInput,
    setCidadeClienteInput,
    ufClienteInput,
    setUfClienteInput,
    cliente,
    handleAcharCliente,
    handleGetListaClientes,
    handleGetListarCobrancas,
    setConteudoTabelao,
    listaClientes,
    detalhesCliente,
    handleViaCEP,
  } = useUsersList();

  const handleTelefoneMask = () => {
    if (telefoneClienteInput) {
      if (telefoneClienteInput[4] === "9") {
        return "(99)99999-9999";
      }
    }
    return "(99)9999-9999";
  };

  const handleTelefoneSize = () => {
    if (telefoneClienteInput) {
      if (telefoneClienteInput[4] === "9") {
        return "11";
      }
    }
    return "10";
  };

  const handleBlur = (estado, id, id2) => {
    if (
      (id === "cpfCliente" || id === "editarCpfCliente") &&
      cpfClienteInput.replace(/\D/g, "").length < 11
    ) {
      document.getElementById(id).style.border = "1px solid #E70000";
      document.getElementById(id2).textContent = "Informe um cpf valido";
      return;
    }

    if (
      (id === "telefoneCliente" || id === "editarTelefoneCliente") &&
      telefoneClienteInput.replace(/\D/g, "").length < handleTelefoneSize()
    ) {
      document.getElementById(id).style.border = "1px solid #E70000";
      document.getElementById(id2).textContent = "Informe um telefone valido";
      return;
    }

    if (
      (id === "cepCliente" || id === "editarCepCliente") &&
      cepClienteInput.replace(/\D/g, "").length < 8 &&
      cepClienteInput.replace(/\D/g, "").length > 0
    ) {
      document.getElementById(id).style.border = "1px solid #E70000";
      document.getElementById(id2).textContent = "Informe um cep valido";
      return;
    }

    if (estado) {
      document.getElementById(id).style.border = "1px solid #D0D5DD";
      document.getElementById(id2).textContent = "";
      return;
    }

    document.getElementById(id).style.border = "1px solid #E70000";
    document.getElementById(id2).textContent = "Este campo deve ser preenchido";
  };

  const checkValues = () => {
    if (!nomeClienteInput) {
      setSucesso(false);
      setMensagem("Nome deve ser preenchido");
      handleMostraMensagem();
      return;
    }

    if (!emailClienteInput) {
      setSucesso(false);
      setMensagem("Email deve ser valido");
      handleMostraMensagem();
      return;
    }

    if (cpfClienteInput.replace(/\D/g, "").length < 11) {
      setSucesso(false);
      setMensagem("Cpf invalido");
      handleMostraMensagem();
      return;
    }

    if (telefoneClienteInput.replace(/\D/g, "").length < handleTelefoneSize()) {
      setSucesso(false);
      setMensagem("Telefone invalido");
      handleMostraMensagem();
      return;
    }

    if (
      cepClienteInput.replace(/\D/g, "").length < 8 &&
      cepClienteInput.replace(/\D/g, "").length > 0
    ) {
      setSucesso(false);
      setMensagem("Cep invalido");
      handleMostraMensagem();
      return;
    }

    detalhesCliente ? handleUpdateCliente() : handleCadastroCliente();
  };

  async function handleCadastroCliente() {
    try {
      const response = await fetch(
        "https://back-modulo-5-teste.herokuapp.com/clientes",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome: nomeClienteInput.trim(),
            email: emailClienteInput.trim(),
            cpf: cpfClienteInput.toString().replace(/\D/g, "").trim(),
            telefone: telefoneClienteInput.toString().replace(/\D/g, "").trim(),
            logradouro: endereçoClienteInput.trim(),
            cep: cepClienteInput.replace(/\D/g, "").trim(),
            bairro: bairroClienteInput.trim(),
            cidade: cidadeClienteInput.trim(),
            complemento: complementoClienteInput.trim(),
            estado: ufClienteInput.trim(),
          }),
        }
      );
      const data = await response.json();

      setMensagem(data.mensagem);
      setSucesso(data.sucesso);
      if (data.sucesso) {
        setModalCadastroClienteAberto(false);
        setMostraMensagem(true);
        handleGetListaClientes();
        handleGetListarCobrancas();
        setConteudoTabelao(listaClientes);
      } else {
        handleMostraMensagem();
        setModalCadastroClienteAberto(true);
      }
    } catch (error) {
      setSucesso(false);
      setMensagem(error.message);
      setModalCadastroClienteAberto(true);
      handleMostraMensagem();
    }
  }

  async function handleUpdateCliente() {
    try {
      const response = await fetch(
        `https://back-modulo-5-teste.herokuapp.com/clientes/${cliente.id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome: nomeClienteInput.trim(),
            email: emailClienteInput.trim(),
            cpf: cpfClienteInput.toString().replace(/\D/g, "").trim(),
            telefone: telefoneClienteInput.toString().replace(/\D/g, "").trim(),
            logradouro: endereçoClienteInput
              ? endereçoClienteInput.trim()
              : null,
            cep: cepClienteInput
              ? cepClienteInput.replace(/\D/g, "").trim()
              : null,
            bairro: bairroClienteInput ? bairroClienteInput.trim() : null,
            cidade: cidadeClienteInput ? cidadeClienteInput.trim() : null,
            complemento: complementoClienteInput
              ? complementoClienteInput.trim()
              : null,
            estado: ufClienteInput ? ufClienteInput.trim() : null,
          }),
        }
      );
      const data = await response.json();

      setMensagem(data.mensagem);
      setSucesso(data.sucesso);
      if (data.sucesso) {
        setModalCadastroClienteAberto(false);
        setMostraMensagem(true);
        handleAcharCliente(cliente.id);
        handleGetListaClientes();
        handleGetListarCobrancas();
        setConteudoTabelao(listaClientes);
      } else {
        handleMostraMensagem();
        setModalCadastroClienteAberto(true);
      }
    } catch (error) {
      setSucesso(false);
      setMensagem(error.message);
      setModalCadastroClienteAberto(true);
      handleMostraMensagem();
    }
  }

  const handleCancelaCadastroCliente = () => {
    setModalCadastroClienteAberto(false);
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
  };

  return (
    <div className="fundoModalCadastroCliente">
      <div className="modalCadastroCliente">
        <img
          className="fechaModalCadastroCliente"
          src={fechar}
          alt="x"
          onClick={() => {
            if (!detalhesCliente) {
              handleCancelaCadastroCliente();
            }
            setModalCadastroClienteAberto(false);
          }}
        />
        <div className="cabecalhoModalCadastroCliente">
          <img src={clientesIcone} alt="clientes-icone" />
          <h2>{detalhesCliente ? "Editar Cliente" : "Cadastro do Cliente"}</h2>
        </div>

        <div className="contemInputsModalCadastroCliente">
          <label for={editando ? "editarNomeCliente" : "nomeCliente"}>
            Nome*
          </label>
          <input
            className="inputGrande"
            id={editando === "true" ? "editarNomeCliente" : "nomeCliente"}
            type="text"
            required
            onBlur={() =>
              handleBlur(
                nomeClienteInput,
                editando ? "editarNomeCliente" : "nomeCliente",
                editando ? "spanEditarNome" : "spanNome"
              )
            }
            placeholder="Digite o nome"
            onChange={(event) =>
              setNomeClienteInput(event.target.value.replace(/[^A-Za-z ]/g, ""))
            }
            value={nomeClienteInput}
          />
          <span
            id={editando ? "spanEditarNome" : "spanNome"}
            className="alerta"
          ></span>
          <label for={editando ? "editarEmailCliente" : "emailCliente"}>
            Email*
          </label>
          <input
            className="inputGrande"
            id={editando ? "editarEmailCliente" : "emailCliente"}
            type="email"
            required
            onBlur={() =>
              handleBlur(
                emailClienteInput,
                editando ? "editarEmailCliente" : "emailCliente",
                editando ? "spanEditarAlerta" : "spanAlerta"
              )
            }
            placeholder="Digite o e-mail"
            onChange={(event) => setEmailClienteInput(event.target.value)}
            value={emailClienteInput}
          />
          <span
            id={editando ? "spanEditarAlerta" : "spanAlerta"}
            className="alerta"
          ></span>
          <div className="contemInputsPequenos">
            <div className="contemInputPequeno">
              <label for="cpfCliente">CPF*</label>
              <InputMask
                id={editando ? "editarCpfCliente" : "cpfCliente"}
                mask="999.999.999-99"
                type="text"
                required
                onBlur={() =>
                  handleBlur(
                    cpfClienteInput,
                    editando ? "editarCpfCliente" : "cpfCliente",
                    editando ? "spanEditarCpf" : "spanCpf"
                  )
                }
                placeholder="Digite o CPF"
                onChange={(event) => setCpfClienteInput(event.target.value)}
                value={cpfClienteInput}
              />
              <span
                id={editando ? "spanEditarCpf" : "spanCpf"}
                className="alerta"
              ></span>
            </div>
            <div className="contemInputPequeno">
              <label for="telefoneCliente">Telefone*</label>
              <InputMask
                id={editando ? "editarTelefoneCliente" : "telefoneCliente"}
                mask={handleTelefoneMask()}
                type="text"
                required
                onBlur={() =>
                  handleBlur(
                    telefoneClienteInput,
                    editando ? "editarTelefoneCliente" : "telefoneCliente",
                    editando ? "spanEditarTelefone" : "spanTelefone"
                  )
                }
                placeholder="Digite o Telefone"
                onChange={(event) =>
                  setTelefoneClienteInput(event.target.value)
                }
                value={telefoneClienteInput}
              />
              <span
                id={editando ? "spanEditarTelefone" : "spanTelefone"}
                className="alerta"
              ></span>
            </div>
          </div>

          <label for="endereçoCliente">Endereço</label>
          <input
            className="inputGrande"
            id="endereçoCliente"
            type="text"
            placeholder="Digite o endereço"
            onChange={(event) => setEndereçoClienteInput(event.target.value)}
            value={endereçoClienteInput}
          />
          <label for="complementoCliente">Complemento</label>
          <input
            className="inputGrande"
            id="complementoCliente"
            type="text"
            placeholder="Digite o complemento"
            onChange={(event) => setComplementoClienteInput(event.target.value)}
            value={complementoClienteInput}
          />

          <div className="contemInputsPequenos">
            <div className="contemInputPequeno">
              <label for="cepCliente">CEP</label>
              <InputMask
                id={editando ? "editarCepCliente" : "cepCliente"}
                mask="99.999-999"
                type="text"
                onBlur={() =>
                  handleBlur(
                    cepClienteInput,
                    editando ? "editarCepCliente" : "cepCliente",
                    editando ? "spanEditarCep" : "spanCep"
                  )
                }
                placeholder="Digite o CEP"
                onChange={(event) => handleViaCEP(event.target.value)}
                value={cepClienteInput}
              />
              <span
                id={editando ? "spanEditarCep" : "spanCep"}
                className="alerta"
              ></span>
            </div>

            <div className="contemInputPequeno">
              <label for="bairroCliente">Bairro</label>
              <input
                id="bairroCliente"
                type="text"
                placeholder="Digite o bairro"
                onChange={(event) => setBairroClienteInput(event.target.value)}
                value={bairroClienteInput}
              />
            </div>
          </div>

          <div className="contemInputsPequenos">
            <div className="contemInputPequeno">
              <label for="cidadeCliente">Cidade</label>
              <input
                id="cidadeCliente"
                type="text"
                placeholder="Digite a Cidade"
                onChange={(event) => setCidadeClienteInput(event.target.value)}
                value={cidadeClienteInput}
              />
            </div>
            <div className="contemInputPequenoUF">
              <label for="UFCliente">UF</label>
              <input
                id="UFCliente"
                type="text"
                placeholder="Digite a UF"
                onChange={(event) => setUfClienteInput(event.target.value)}
                value={ufClienteInput}
              />
            </div>
          </div>

          <div className="contemCancelarAplicar">
            <button
              className="cancelaCadastroCliente"
              onClick={handleCancelaCadastroCliente}
            >
              Cancelar
            </button>
            <button className="aplicaCadastroCliente" onClick={checkValues}>
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCadastroCliente;
