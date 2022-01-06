import { useState } from "react";
import { useLocalStorage } from "react-use";

function useUsersListProvider() {
  const [cliente, setCliente] = useState({});
  const [temp, setTemp] = useState([]);
  const [tempPesquisa, setTempPesquisa] = useState([]);
  const [cobrancasCliente, setCobrancasCliente] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mostraMensagem, setMostraMensagem] = useState(false);
  const [mostraConfirmacaoEdicao, setMostraConfirmacaoEdicao] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [opcoesPerfilAberta, setOpcoesPerfilAberta] = useState(false);
  const [edicaoCadastroAberta, setEdicaoCadastroAberta] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState();
  const [siglaNomeUsuario, setSiglaNomeUsuario] = useState();
  const [confirmarSenhaInput, setConfirmarSenhaInput] = useState("");
  const [token, setToken, removeToken] = useLocalStorage("tokenLogin", "");
  const [usuarioLogado, setUsuarioLogado, removeUsuarioLogado] =
    useLocalStorage("usuarioLogado", "");
  const [
    siglaNomeUsuarioLogado,
    setSiglaNomeUsuarioLogado,
    removeSiglaNomeUsuario,
  ] = useLocalStorage("siglaNomeUsuarioLogado", "");
  const [nome, setNome] = useState(dadosUsuario.nome);
  const [email, setEmail] = useState(dadosUsuario.email);
  const [cpf, setCpf] = useState(dadosUsuario.cpf);
  const [telefone, setTelefone] = useState(dadosUsuario.telefone);
  const [novaSenhaInput, setNovaSenhaInput] = useState("");
  const [menuSelecionado, setMenuSelecionado] = useState("home");
  const [modalCadastroClienteAberto, setModalCadastroClienteAberto] =
    useState(false);
  const [modalCadastroCobranca, setModalCadastroCobranca] = useState(false);
  const [modalDetalhesCobranca, setModalDetalhesCobranca] = useState(false);

  const [modalEditarCobranca, setModalEditarCobranca] = useState(false);
  const [modalExcluirCobranca, setModalExcluirCobranca] = useState(false);
  const [excluirCobranca, setExcluirCobranca] = useState([]);
  const [atualizarCobranca, setAtualizarCobranca] = useState([]);
  const [detalhesCliente, setDetalhesCliente] = useState(false);
  const [dadosCobranca, setDadosCobranca] = useState({
    cliente_id: "",
    descricao: "",
    vencimento: "",
    valor: "",
    status: "",
  });
  const [dadosUpdateCliente, setDadosUpdateCliente] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    logradouro: "",
    cep: "",
    bairro: "",
    cidade: "",
    complemento: "",
    estado: "",
  });

  const [dadosLogin, setDadosLogin] = useState({
    senha: "",
    mostrarSenha: false,
    email: "",
  });

  const [dadosCadastro, setDadosCadastro] = useState({
    nome: "",
    senha: "",
    email: "",
    confirmarSenha: "",
    mostrarSenha: false,
    mostrarConfirmarSenha: false,
  });

  const handleCriarCobranca = async () => {
    try {
      const response = await fetch(
        "https://back-modulo-5-teste.herokuapp.com/cobrancas",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cliente_id: parseInt(dadosCobranca.cliente_id),
            descricao: dadosCobranca.descricao,
            vencimento: dadosCobranca.vencimento.split("/").reverse().join("-"),
            valor: dadosCobranca.valor * 100,
            status: dadosCobranca.status,
          }),
        }
      );

      const data = await response.json();
      if (data.sucesso === false) {
        setSucesso(false);
        setMensagem(data.mensagem);
        handleMostraMensagem();
        setDadosCobranca({ ...dadosCobranca, status: "" });
      } else {
        setModalCadastroCobranca(false);
        handleGetListarCobrancas();

        if (detalhesCliente) {
          handleAcharCliente(dadosCobranca.cliente_id);
          handleListarCobrancasCliente(dadosCobranca.cliente_id);
          handleGetListaClientes();
        }

        if (menuSelecionado === "clientes") {
          handleGetListaClientes();
        }
        setSucesso(true);
        setMensagem(data.mensagem);
        handleMostraMensagem();
        setDadosCobranca({
          cliente_id: "",
          descricao: "",
          vencimento: "",
          valor: "",
          status: "",
        });
      }
    } catch (error) {
      setMensagem(error.message);
      setSucesso(false);
      handleMostraMensagem();
    }
  };

  const handleGetDadosUsuario = async (tokenRecebido) => {
    try {
      const response = await fetch(
        "https://back-modulo-5-teste.herokuapp.com/usuario",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tokenRecebido}`,
          },
        }
      );
      const data = await response.json();
      setDadosUsuario(data);
      setNome(data.nome);
      setEmail(data.email);
      setCpf(data.cpf);
      setTelefone(data.telefone);
      setUsuarioLogado(data.nome.split(" ")[0]);
      setSiglaNomeUsuarioLogado(
        data.nome[0].toLocaleUpperCase() + data.nome[1].toLocaleUpperCase()
      );
    } catch (error) {
      setSucesso(false);
      setMensagem(error.message);
      handleMostraMensagem();
    }
  };
  const [listaClientes, setListaClientes] = useState([]);

  const [listarCobrancas, setListarCobrancas] = useState([]);
  const [conteudoTabelao, setConteudoTabelao] = useState([]);

  const handleGetListaClientes = async () => {
    try {
      const response = await fetch(
        "https://back-modulo-5-teste.herokuapp.com/clientes",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      const dataAtualizado = [];

      data.forEach((x) => {
        if (guardaIdsInadimplentes.includes(x.id)) {
          x = { ...x, status: "Inadimplente" };
        } else {
          x = { ...x, status: "Em Dia" };
        }
        dataAtualizado.push(x);
      });
      setListaClientes(dataAtualizado);
      setConteudoTabelao(dataAtualizado);
      setTemp(dataAtualizado);
    } catch (error) {
      setSucesso(false);
      setMensagem(error.message);
      handleMostraMensagem();
    }
  };

  const handleAcharCliente = async (idDoCliente) => {
    try {
      const response = await fetch(
        `https://back-modulo-5-teste.herokuapp.com/clientes/${idDoCliente}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCliente(data);
      setNomeClienteInput(data.nome);
      setEmailClienteInput(data.email);
      setCpfClienteInput(data.cpf);
      setTelefoneClienteInput(data.telefone);
      setEndereçoClienteInput(data.logradouro);
      setComplementoClienteInput(data.complemento);
      setCepClienteInput(data.cep);
      setBairroClienteInput(data.bairro);
      setCidadeClienteInput(data.cidade);
      setUfClienteInput(data.estado);
    } catch (error) {
      setSucesso(false);
      setMensagem(error.message);
      handleMostraMensagem();
    }
  };

  const handleGetListarCobrancas = async () => {
    try {
      const response = await fetch(
        "https://back-modulo-5-teste.herokuapp.com/cobrancas",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      const dataAtualizado = [];
      data.forEach((x) => {
        if (x.status.trim() !== "Paga") {
          const statusReal = verificaVencidas(x.vencimento, x.cliente_id);
          x = { ...x, status: statusReal };
        }
        dataAtualizado.push(x);
      });
      setListarCobrancas(dataAtualizado);
      if (excluirCobranca.length !== 0) {
        setTemp(dataAtualizado);
        setConteudoTabelao(dataAtualizado);
      }
      if (atualizarCobranca.length !== 0) {
        setTemp(dataAtualizado);
        setConteudoTabelao(dataAtualizado);
      }

    } catch (error) {
      setMensagem(error.message);
      setSucesso(false);
      handleMostraMensagem();
    }

  };

  const handleListarCobrancasCliente = async (idCliente) => {
    try {
      const response = await fetch(
        `https://back-modulo-5-teste.herokuapp.com/cobrancas/${idCliente}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      const dataAtualizado = [];
      data.forEach((x) => {
        if (x.status.trim() !== "Paga") {
          const statusReal = verificaVencidas(x.vencimento, x.cliente_id);
          x = { ...x, status: statusReal };
        }
        dataAtualizado.push(x);
      });
      setCobrancasCliente(dataAtualizado);
      handleGetListarCobrancas();
    } catch (error) {
      setMensagem(error.message);
      setSucesso(false);
      handleMostraMensagem();
    }
  };

  const handleUpdateCobranca = async (id) => {
    try {
      const response = await fetch(
        `https://back-modulo-5-teste.herokuapp.com/cobrancas/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            descricao: dadosCobranca.descricao,
            vencimento: dadosCobranca.vencimento.split("/").reverse().join("-"),
            valor: dadosCobranca.valor * 100,
            status: dadosCobranca.status,
          }),
        }
      );
      const data = await response.json();

      if (data.sucesso === false) {
        setSucesso(false);
        setMensagem(data.mensagem);
        handleMostraMensagem();
        setDadosCobranca({ ...dadosCobranca, status: "" });
      } else {
        setModalEditarCobranca(false);
        await handleGetListarCobrancas();

        setSucesso(true);
        setMensagem(data.mensagem);
        handleMostraMensagem();
        setDadosCobranca({
          cliente_id: "",
          descricao: "",
          vencimento: "",
          valor: "",
          status: "",
        });
        setAtualizarCobranca([]);
        if (detalhesCliente) {
          await handleAcharCliente(dadosCobranca.cliente_id);
          await handleListarCobrancasCliente(dadosCobranca.cliente_id);
          await handleGetListaClientes()

        }
      }
    } catch (error) {
      setSucesso(false);
      setMensagem(error.message);
      handleMostraMensagem(true);
      setAtualizarCobranca([]);
    }
  };

  const handleDeletarCobrancasCliente = async (idCliente) => {
    if (excluirCobranca.status.trim() === "Pendente") {
      try {
        const response = await fetch(
          `https://back-modulo-5-teste.herokuapp.com/cobrancas/${idCliente}`,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data) {
          await handleGetListarCobrancas();
          setMensagem(data.mensagem);
          setSucesso(data.sucesso);
          setModalExcluirCobranca(false);
          handleMostraMensagem(true);
          setExcluirCobranca([]);
          if (detalhesCliente) {
            await handleAcharCliente(dadosCobranca.cliente_id);
            await handleListarCobrancasCliente(dadosCobranca.cliente_id);
            await handleGetListaClientes()

          }
        }
      } catch (error) {
        setMensagem(error.message);
        setSucesso(false);
        handleMostraMensagem();
        setExcluirCobranca([]);
      }
    } else {
      setModalExcluirCobranca(false);
      setSucesso(false);
      setExcluirCobranca([]);
      setMensagem("Não é possivel excluir esta cobrança");
      handleMostraMensagem();
    }
  };

  const bodyAtualizacao = () => {
    if (!confirmarSenhaInput) {
      return {
        nome: nome,
        email: email,
        cpf: cpf !== "" ? cpf : null,
        telefone: telefone !== "" ? telefone : null,
      };
    } else {
      return {
        nome: nome,
        email: email,
        cpf: cpf !== "" ? cpf : null,
        telefone: telefone !== "" ? telefone : null,
        senha: confirmarSenhaInput,
      };
    }
  };

  const [dadosDoCep, setDadosDoCep] = useState();

  const handleViaCEP = async (cep) => {
    setCepClienteInput(cep);
    if (cep.replace(/\D/g, "").length !== 8) {
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.erro) {
        return;
      }
      setDadosDoCep(data);
      setBairroClienteInput(data.bairro);
      setEndereçoClienteInput(data.logradouro);
      setComplementoClienteInput(data.complemento);
      setCidadeClienteInput(data.localidade);
      setUfClienteInput(data.uf);
    } catch (error) { }
  };

  const handleEditaUsuario = async () => {
    try {
      const response = await fetch(
        "https://back-modulo-5-teste.herokuapp.com/usuario",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyAtualizacao()),
        }
      );

      const data = await response.json();
      setMensagem(data.mensagem);
      setSucesso(data.sucesso);

      if (data.sucesso) {
        setMostraConfirmacaoEdicao(true);
        setUsuarioLogado(bodyAtualizacao().nome.split(" ")[0]);
        setSiglaNomeUsuarioLogado(
          bodyAtualizacao().nome[0].toLocaleUpperCase() +
          bodyAtualizacao().nome[1].toLocaleUpperCase()
        );
        handleGetDadosUsuario(token);
      }
    } catch (error) {
      setMensagem(error.message);
      setSucesso(false);
      handleMostraMensagem();
    }
  };
  const [tipoModalCliente, setTipoModalCliente] = useState("cadastro");
  const [idEdicaoCliente, setIdEdicaoCliente] = useState();

  const handleAbreCadastroCliente = () => {
    setTipoModalCliente("cadastro");
    setModalCadastroClienteAberto(true);
  };
  const handleAbreEdicaoCliente = (id) => {
    setTipoModalCliente("edicao");
    setIdEdicaoCliente(id.toString());
    setModalCadastroClienteAberto(true);
  };
  const handleMostraMensagem = () => {
    setMostraMensagem(true);
    setTimeout(() => {
      setMostraMensagem(false);
    }, 250000);
  };
  const [nomeClienteInput, setNomeClienteInput] = useState("");
  const [emailClienteInput, setEmailClienteInput] = useState("");
  const [cpfClienteInput, setCpfClienteInput] = useState("");
  const [telefoneClienteInput, setTelefoneClienteInput] = useState("");
  const [endereçoClienteInput, setEndereçoClienteInput] = useState("");
  const [complementoClienteInput, setComplementoClienteInput] = useState("");
  const [cepClienteInput, setCepClienteInput] = useState("");
  const [bairroClienteInput, setBairroClienteInput] = useState("");
  const [cidadeClienteInput, setCidadeClienteInput] = useState("");
  const [ufClienteInput, setUfClienteInput] = useState("");
  const [guardaIdsInadimplentes, setGuardaIdsInadimplentes] = useState([]);

  const verificaVencidas = (data, idCliente) => {
    if (new Date(data).getTime() <= new Date().getTime()) {
      if (!guardaIdsInadimplentes.includes(idCliente)) {
        guardaIdsInadimplentes.push(idCliente);
        setGuardaIdsInadimplentes(guardaIdsInadimplentes);
      }
      return "Vencida";
    } else {
      return "Pendente";
    }
  };

  const [tipoTabelao, setTipoTabelao] = useState();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginaAtualDetalhes, setPaginaAtualDetalhes] = useState(1);

  return {
    paginaAtual,
    setPaginaAtual,
    tipoTabelao,
    setTipoTabelao,
    cliente,
    setCliente,
    cobrancasCliente,
    setCobrancasCliente,
    handleListarCobrancasCliente,
    dadosUsuario,
    setDadosUsuario,
    opcoesPerfilAberta,
    setOpcoesPerfilAberta,
    edicaoCadastroAberta,
    setEdicaoCadastroAberta,
    nomeUsuario,
    setNomeUsuario,
    siglaNomeUsuario,
    setSiglaNomeUsuario,
    handleGetDadosUsuario,
    handleEditaUsuario,
    confirmarSenhaInput,
    setConfirmarSenhaInput,
    nome,
    setNome,
    email,
    setEmail,
    cpf,
    setCpf,
    telefone,
    setTelefone,
    novaSenhaInput,
    setNovaSenhaInput,
    menuSelecionado,
    setMenuSelecionado,
    modalCadastroClienteAberto,
    setModalCadastroClienteAberto,
    dadosLogin,
    setDadosLogin,
    dadosCadastro,
    setDadosCadastro,
    token,
    setToken,
    removeToken,
    mensagem,
    setMensagem,
    mostraMensagem,
    setMostraMensagem,
    sucesso,
    setSucesso,
    handleMostraMensagem,
    mostraConfirmacaoEdicao,
    setMostraConfirmacaoEdicao,
    usuarioLogado,
    setUsuarioLogado,
    removeUsuarioLogado,
    siglaNomeUsuarioLogado,
    setSiglaNomeUsuarioLogado,
    removeSiglaNomeUsuario,
    listarCobrancas,
    setListarCobrancas,
    handleGetListarCobrancas,
    conteudoTabelao,
    tipoModalCliente,
    setTipoModalCliente,
    handleAbreCadastroCliente,
    handleAbreEdicaoCliente,
    listaClientes,
    setListaClientes,
    handleGetListaClientes,
    setConteudoTabelao,
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
    idEdicaoCliente,
    setIdEdicaoCliente,
    detalhesCliente,
    setDetalhesCliente,
    handleAcharCliente,
    guardaIdsInadimplentes,
    setGuardaIdsInadimplentes,
    dadosDoCep,
    setDadosDoCep,
    handleViaCEP,
    modalCadastroCobranca,
    setModalCadastroCobranca,
    handleCriarCobranca,
    dadosCobranca,
    setDadosCobranca,
    dadosUpdateCliente,
    setDadosUpdateCliente,
    verificaVencidas,
    modalExcluirCobranca,
    setModalExcluirCobranca,
    modalEditarCobranca,
    setModalEditarCobranca,
    temp,
    setTemp,
    tempPesquisa,
    setTempPesquisa,
    handleDeletarCobrancasCliente,
    handleUpdateCobranca,
    excluirCobranca,
    setExcluirCobranca,
    paginaAtualDetalhes,
    setPaginaAtualDetalhes,
    atualizarCobranca,
    setAtualizarCobranca,
    modalDetalhesCobranca,
    setModalDetalhesCobranca,
  };
}
export default useUsersListProvider;
