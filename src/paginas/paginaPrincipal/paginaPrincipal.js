import useUsersList from "../../hooks/useUsersList";
import Menu from "../../componentes/menu/Menu";
import Home from "../home/Home";
import Clientes from "../clientes/Clientes";
import ModalEdicaoCadastro from "../../componentes/modais/modalEdicaoCadastro/ModalEdicaoCadastro";
import CardMensagem from "../../componentes/cardMensagem/CardMensagem.jsx";
import Cobrancas from '../cobrancas/Cobrancas'
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { isBefore } from 'date-fns'

function PaginaPrincipal() {
  const { edicaoCadastroAberta, menuSelecionado, token, mostraMensagem, handleGetListarCobrancas, handleGetListaClientes, removeToken } =
    useUsersList();

  const navigate = useNavigate();

  const [gotData, setGotData] = useState(false);

  useEffect(() => {
    if (token) {
      const { exp } = jwt_decode(token)

      const carregarDados = async () => {
        if (token && gotData === false) {
          await handleGetListarCobrancas();
          handleGetListaClientes()
          setGotData(true);
        }
      }

      if (isBefore(new Date(exp * 1000), new Date())) {
        removeToken();
      } else {
        carregarDados()

      }

    } if (!token) {
      navigate("/");
    }
  }, [navigate, token, removeToken, gotData, handleGetListarCobrancas, setGotData, handleGetListaClientes])

  const handleRender = () => {
    return menuSelecionado === "cobrancas" ? (
      <Cobrancas />
    ) : menuSelecionado === "clientes" ? (
      <Clientes />
    ) : (
      <Home />
    );
  };

  return (
    <div className="Teste">
      <Menu />
      {mostraMensagem && <CardMensagem />}
      {handleRender()}
      {edicaoCadastroAberta && <ModalEdicaoCadastro />}
    </div>
  );
}

export default PaginaPrincipal;
