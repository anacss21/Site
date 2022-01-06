import "./style.css";
import homeSelecionado from "../../assets/menu/homeSelecionado.svg";
import clientesSelecionado from "../../assets/menu/clientesSelecionado.svg";
import cobrancasSelecionado from "../../assets/menu/cobrancasSelecionado.svg";
import home from "../../assets/menu/home.svg";
import clientes from "../../assets/menu/clientes.svg";
import cobrancas from "../../assets/menu/cobrancas.svg";
import linhaVertical from "../../assets/menu/linhaVertical.svg";
import useUsersList from "../../hooks/useUsersList";

function Menu() {
  const {
    menuSelecionado,
    setMenuSelecionado,
    listaClientes,
    setConteudoTabelao,
    listarCobrancas,
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
    setDetalhesCliente,
    setTemp,
    setTipoTabelao,
    setTempPesquisa,
    setPaginaAtual,
  } = useUsersList();

  const handleMenu = () => {
    setPaginaAtual(1);
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
  };

  return (
    <header className="menuLateral">
      <div className="contemOpcaoMenu">
        <img
          src={menuSelecionado === "home" ? homeSelecionado : home}
          alt="home"
          className="opcaoMenu menuHome"
          onClick={() => {
            setTemp([]);
            setTempPesquisa([]);
            setMenuSelecionado("home");
            setTipoTabelao("");
            setConteudoTabelao([]);
            handleMenu();
          }}
        />
        <img
          src={linhaVertical}
          alt="linha vertical"
          className={
            menuSelecionado === "home" ? "linhaVerticalHome" : "esconde"
          }
        />
      </div>
      <div className="contemOpcaoMenu">
        <img
          src={menuSelecionado === "clientes" ? clientesSelecionado : clientes}
          alt="clientes"
          onClick={async () => {
            setMenuSelecionado("clientes");
            setTipoTabelao("clientes");
            setTemp(listaClientes);
            setTempPesquisa(listaClientes);
            handleMenu();
          }}
          className="opcaoMenu"
        />
        <img
          src={linhaVertical}
          alt="linha vertical"
          className={
            menuSelecionado === "clientes" ? "linhaVertical" : "esconde"
          }
        />
      </div>
      <div className="contemOpcaoMenu">
        <img
          src={
            menuSelecionado === "cobrancas" ? cobrancasSelecionado : cobrancas
          }
          alt="cobranças"
          id="menuCobrancas"
          onClick={() => {
            setMenuSelecionado("cobrancas");
            setTemp(listarCobrancas);
            setTempPesquisa(listarCobrancas);
            setTipoTabelao("cobrancas");
            handleMenu();
          }}
          className="opcaoMenu"
        />
        <img
          src={linhaVertical}
          alt="linha vertical"
          className={
            menuSelecionado === "cobrancas" ? "linhaVertical" : "esconde"
          }
        />
      </div>
    </header>
  );
}

export default Menu;
