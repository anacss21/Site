import { React, useEffect } from "react";
import Formulario from "../../componentes/formulario/formulario";
import CardMensagem from "../../componentes/cardMensagem/CardMensagem";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useUsersList from "../../hooks/useUsersList";

export default function LoginUsuario() {
  const {
    token,
    dadosLogin,
    setToken,
    setSucesso,
    setMensagem,
    mostraMensagem,
    handleMostraMensagem,
    handleGetDadosUsuario,
    setDetalhesCliente,
    setMenuSelecionado
  } = useUsersList();

  const login = {
    titulo: "Faça seu login!",
    label: "E-mail",
    label2: "Senha",
    label3: (
      <div className="nomeLabelSenha">
        <p>Senha*</p>
        <p className="trocarSenha">
          <a href=".">Esqueceu a senha?</a>
        </p>
      </div>
    ),
    acao: "Entrar",
    textoRodape: "Ainda não possui uma conta?",
    linkRodape: "Cadastre-se",
    step2: false,
    login: true,
  };

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await fetch("https://back-modulo-5-teste.herokuapp.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: dadosLogin.email.trim(),
          senha: dadosLogin.senha.trim(),
        }),
      });

      const data = await response.json()
      if (data.token) {
        setToken(data.token)
        handleGetDadosUsuario(data.token)
        setDetalhesCliente(false)
        setMenuSelecionado("home")
        navigate("/home")
      } else {
        setSucesso(false);
        setMensagem("Email ou senha inválidos");
        handleMostraMensagem();
      }
    } catch (error) {
      setSucesso(false);
      setMensagem(error.message);
      handleMostraMensagem();
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });

  return (
    <>
      {mostraMensagem && <CardMensagem />}
      <div className="telaGeral">
        <div className="telaEsquerda">
          <p className="informeBackground">
            Gerencie todos os pagamentos da sua empresa em um só lugar.
          </p>
        </div>
        <div className="loginTelaDireita">
          <div className="teste">
            <Formulario valores={login} avancar={handleLogin} />
          </div>
        </div>
      </div>
    </>
  );
}
