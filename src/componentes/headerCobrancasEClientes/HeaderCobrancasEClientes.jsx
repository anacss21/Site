import "./style.css";
import useUsersList from "../../hooks/useUsersList";
import clientesIcone from "../../assets/clientes/clientesIcone.svg";
import lupa from "../../assets/clientes/lupa.svg";
import PerfilUsuario from "../headerCobrancasEClientes/perfilUsuario";

function HeaderCobrancasEClientes({ estouEm }) {
  const { handleAbreCadastroCliente,
    setDetalhesCliente,
    detalhesCliente,
    cliente,
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
    setTemp,
    tempPesquisa,
    setPaginaAtual
  } = useUsersList();

  const handleNavigate = () => {
    if (estouEm === "clientes") {
      setDetalhesCliente(false)
    }
  }

  const handleMenu = () => {
    setDetalhesCliente(false);
    setNomeClienteInput("")
    setEmailClienteInput("")
    setCpfClienteInput("")
    setTelefoneClienteInput('')
    setEndereçoClienteInput('')
    setComplementoClienteInput('')
    setCepClienteInput('')
    setBairroClienteInput('')
    setCidadeClienteInput('')
    setUfClienteInput('')
  }

  const handleChange = (event) => {
    setPaginaAtual(1)
    if (estouEm === "clientes") {
      setTemp(
        tempPesquisa.filter(item => {
          return (
            item.cpf.startsWith(event.target.value) ||
            item.nome.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
            item.email.toLowerCase().startsWith(event.target.value.toLowerCase())
          )
        })
      )
    }

    if (estouEm !== "clientes") {
      setTemp(
        tempPesquisa.filter(item => {
          return (
            item.cobranca_id.toString().startsWith(event.target.value) ||
            item.nome.toLowerCase().startsWith(event.target.value.toLowerCase())
          )
        })
      )
    }

  }

  return (
    <div>
      <div className="header">
        <div className="headerTitle" >
          <h2 className="tituloPrincipalClientes" onClick={() => handleNavigate()}>
            {estouEm === "clientes" ? "Clientes" : "Cobranças"}
          </h2>
          <h2 className="tituloDetalhesClientes">
            {detalhesCliente ? ">" : ""}
          </h2>
          <h2 className="tituloDetalhesClientes">
            {detalhesCliente ? "Detalhes do cliente" : ""}
          </h2>
        </div>

        <PerfilUsuario />
      </div>
      <hr className="linhaHorizontal" />
      <div className="utilidadesPaginaClientes">
        <div className="boxIconeNome">
          <img src={clientesIcone} alt="clientes-icone" />
          <h3>{detalhesCliente ? cliente.nome : (estouEm === "clientes" ? "Clientes" : "Cobranças")}</h3>
        </div>
        {!detalhesCliente && <div className="boxAdicionaEPesquisa">
          {estouEm === "clientes" && (
            <button
              className="botaoAdicionaCliente"
              onClick={() => {
                handleAbreCadastroCliente();
                handleMenu()
              }}
            >
              <span>+ Adicionar cliente </span>
            </button>
          )}

          <div className="contemInputPesquisa">
            <input onChange={(event) => handleChange(event)} className="pesquisa" type="text" placeholder="Pesquisa" />
            <img src={lupa} alt="lupa" />
          </div>
        </div>}
      </div>
    </div >
  );
}

export default HeaderCobrancasEClientes;
