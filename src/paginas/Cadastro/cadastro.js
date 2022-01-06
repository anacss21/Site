import "./style.css";
import { React, useState, useEffect } from "react";
import Formulario from "../../componentes/formulario/formulario";
import Stepper from "../../componentes/stepper/stepper";
import Cadastro from "../../assets/cadastro.svg";
import { useNavigate } from "react-router-dom";
import useUsersList from "../../hooks/useUsersList";
import CardMensagem from "../../componentes/cardMensagem/CardMensagem";

export default function CadastroUsuario() {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const navigate = useNavigate();

  const {
    token,
    dadosCadastro,
    mostraMensagem,
    setSucesso,
    setMensagem,
    handleMostraMensagem,
    setMostraMensagem,
  } = useUsersList();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });

  const vaiParaStep1 = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
  };
  const vaiParaStep2 = () => {
    if (step3) {
      setStep3(false);
      setStep1(false);
      setStep2(true);
    }
  };


  const handleGetEmail = async () => {
    try {
      const response = await fetch("https://back-modulo-5-teste.herokuapp.com/email", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: dadosCadastro.email.trim(),
        }),
      });

      const data = await response.json();
      if (data.sucesso === false) {
        setSucesso(false);
        setMensagem(data.mensagem);
        handleMostraMensagem();
      } else {
        setStep1(false);
        setStep2(true);
      }
    } catch (error) {
      setMensagem(error.message);
      setSucesso(false);
      handleMostraMensagem();
    }
  };

  function cliqueiContinuar() {
    handleGetEmail();
  }
  function cliqueiCadastrar() {
    if (dadosCadastro.senha.length < 6 && dadosCadastro.senha.length > 0) {
      setSucesso(false);
      setMensagem("A senha deve ter pelo menos 6 caracteres");
      handleMostraMensagem();
      return;
    }
    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      setSucesso(false);
      setMensagem("As senhas não coincidem");
      handleMostraMensagem();
    }
    if (dadosCadastro.senha === dadosCadastro.confirmarSenha) {
      handleCadastro();
    }
  }

  async function handleCadastro() {
    try {
      const response = await fetch("https://back-modulo-5-teste.herokuapp.com/usuario", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nome: dadosCadastro.nome.trim(),
          email: dadosCadastro.email.trim(),
          senha: dadosCadastro.senha.trim(),
        }),
      });

      const data = await response.json();
      setSucesso(data.sucesso);
      setMensagem(data.mensagem);
      if (data.sucesso) {
        setStep2(false);
        setStep3(true);
      } else {
        setMostraMensagem(true);
        setStep2(false);
        setStep3(false);
        setStep1(true);
      }
    } catch (error) {
      setSucesso(false);
      setMensagem(error.mensagem);
      setMostraMensagem(true);
      setStep2(false);
      setStep3(false);
      setStep1(true);
    }
  }

  const cadastro1 = {
    titulo: "Adicione seus dados",
    label: "Nome*",
    label3: "E-mail*",
    acao: "Continuar",
    textoRodape: "Já possui uma conta? Faça seu",
    linkRodape: "Login",
    step1: true,
    step2: false,
  };

  const cadastro2 = {
    titulo: "Escolha uma senha",
    label: "Senha*",
    label3: "Repita a senha*",
    acao: "Cadastrar",
    textoRodape: "Já possui uma conta? Faça seu",
    linkRodape: "Login",
    step2: true,
  };

  return (
    <>
      {mostraMensagem && <CardMensagem />}
      <div className="telaGeral">
        <div className="cadastroTelaEsquerda">
          <div className="stepperEsquerda">
            <Stepper step1={step1} step2={step2} step3={step3} />
          </div>
        </div>

        <div className="cadastroTelaDireita">
          <div className={step3 ? "testeSucesso" : "teste"}>
            {step1 && (
              <Formulario valores={cadastro1} avancar={cliqueiContinuar} />
            )}
            {step2 && (
              <Formulario valores={cadastro2} avancar={cliqueiCadastrar} />
            )}
            {step3 && (
              <div className="sucessoCadastro">
                <div className="cadastroFinalBloco">
                  <div className="cadastroImg">
                    <img src={Cadastro} alt="" />
                  </div>
                  <div className="buttonFormulario">
                    <button
                      onClick={() => navigate("/login")}
                      className="btnFormulario"
                    >
                      Ir para Login
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={step3 ? "botaoPassagemSucesso" : "botaoPassagem"}>
            <button
              className={step1 ? "btnVerde" : "btnBranco"}
              onClick={vaiParaStep1}
            >
              {" "}
            </button>
            <button
              className={!step1 && step2 ? "btnVerde" : "btnBranco"}
              onClick={vaiParaStep2}
            ></button>
            <button className={!step3 ? "btnBranco" : "btnVerde"}> </button>
          </div>
        </div>
      </div>
    </>
  );
}
