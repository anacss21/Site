import "../stepper/style.css";
import { React } from "react";
import verificador from "../../assets/verificador.svg";
import imagemProximo from "../../assets/bolaVerde.svg";
import imagemAtual from "../../assets/bolaBranca.svg";
import linha from '../../assets/linha.svg'

function VerificadorProgresso({
  continuarBtn,
  cadastrarBtn,
  cadastroCompleto,
}) {
  return (
    <div className="progressoIcone">
      {continuarBtn && (
        <div className="atualIcone">
          {" "}
          <img className="img" src={imagemProximo} alt="" />
        </div>
      )}
      {cadastrarBtn && (
        <div className="proximoIcone">
          {" "}
          <img className="img" src={imagemAtual} alt="" />{" "}
        </div>
      )}
      {cadastroCompleto && (
        <div className="verificadoIcone">
          {" "}
          <img className="imgVerificada" src={verificador} alt="" />
        </div>
      )}
    </div>
  );
}

export default function Extra({ step1, step2, step3 }) {
  function stepper(step) {
    if (step === "step1") {
      if (step1 === false) {
        return "backgroundVerde";
      } else {
        return "backgroundVerde";
      }
    }

    if (step === "step2") {
      if (step1 === true) {
        return "backgroundBranco";
      } else {
        return "backgroundVerde";
      }
    }

    if (step === "step3") {
      if (step1 === false && step2 === false) {
        return "backgroundVerde";
      } else {
        return "backgroundBranco";
      }
    }
  }

  const dados = [
    {
      nome: "Cadastre-se",
      texto: "Por favor, escreva seu nome e e-mail",
      step: "step1",
      cadastroCompleto: step2 === true || step3 === true,
      continuarBtn: false,
      cadastrarBtn: step1 === true,
    },
    {
      nome: "Escolha uma senha",
      texto: "Escolha uma senha segura",
      step: "step2",
      cadastroCompleto: step3 === true,
      continuarBtn: step1 === true,
      cadastrarBtn: step1 === false && step2 === true,
    },
    {
      nome: "Cadastro realizado com sucesso",
      texto: "E-mail e senha cadastrados com sucesso",
      step: "step3",
      cadastroCompleto: step3 === true,
      continuarBtn: step3 === false,
      cadastrarBtn: false,
    },
  ];

  function ProgressoVertical(props) {
    return (
      <div className="progressoLinhaVertical">
        <div className="progressoItens">
          <div className={stepper(props.step)}>
            <VerificadorProgresso
              cadastroCompleto={props.cadastroCompleto}
              continuarBtn={props.continuarBtn}
              cadastrarBtn={props.cadastrarBtn}
            />
          </div>
          {props.step === "step3" ? "" : <img src={linha} alt="linha" />}
        </div>
        <div className='stepperBlock'>
          <div className="progressoNome"> {props.nome} </div>
          <div className={props.step === "step3" ? "progressoLinhaFinal" : "progressoLinha"} >
            <div className="progressoTransicao">
              <div className="progressoDica">
                <p className="progressoTexto">{props.texto}</p>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }

  return (
    <div className="assistenteVirtual">
      {dados.map((item) => {
        return (
          <ProgressoVertical
            nome={item.nome}
            texto={item.texto}
            step={item.step}
            cadastroCompleto={item.cadastroCompleto}
            continuarBtn={item.continuarBtn}
            cadastrarBtn={item.cadastrarBtn}
          />
        );
      })}
    </div>
  );
}
