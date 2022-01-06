import "./style.css";
import CobrarIcone from "../../../assets/modais/cobrarIcone.svg";
import fechar from "../../../assets/modais/fechar.svg";

function DetalhesCobrancas({ cliente, dadosCobranca, handleFecharModal, setDadosCobranca }) {
  return (
    <div className="fundoModalDetalhesCobranca">
      <div className="modalDetalhesCobranca">
        <div className="fechaModalDetalhesCobranca">
          <img src={fechar} onClick={() => {
            handleFecharModal()
            setDadosCobranca({ descricao: "", vencimento: "", valor: "", status: "" })
          }} alt="x" />
        </div>
        <div className="modalInfoDetalhesCobranca">
          <h2 className="tituloDetalhesCobranca">
            <img className="cobrancaIcone" src={CobrarIcone} alt="x" />
            Detalhe da Cobrança
          </h2>
          <div className="detalhesCobranca">
            <label for="nomeCobranca"> Nome </label>
            <input
              disabled
              className="nomeCobranca"
              type="text"
              value={cliente.nome}
            ></input>
          </div>
          <div className="detalhesCobranca">
            <label for="descricaoCobranca"> Descrição </label>
            <input
              className="descricaoCobranca"
              type="text"
              value={dadosCobranca.descricao}
            ></input>
          </div>
          <div className="detalhesCobrancaInput">
            <div className="detalhesCobrancaLabelInput">
              <label for="vencimento"> Vencimento </label>
              <input
                className="vencimento"
                type="text"
                value={new Date(dadosCobranca.vencimento)
                  .toLocaleDateString("pt-BR", { timeZone: "UTC" })
                  .replace(" 00:00:00", "")}
              ></input>
            </div>
            <div className="detalhesCobrancaLabelInput">
              <label for="valor"> Valor </label>
              <input
                className="vencimento"
                type="text"
                value={dadosCobranca.valor}
              ></input>
            </div>
          </div>
          <div className="detalhesCobrancaInput">
            <div className="detalhesCobrancaLabelInput">
              <label for="id"> ID cobranças </label>
              <input
                className="id"
                type="number"
                value={dadosCobranca.cobranca_id}
              ></input>
            </div>

            <div className="detalhesCobrancaLabelInput">
              <label for="status"> Status </label>
              <span
                className={
                  dadosCobranca.status.trim() === "Paga"
                    ? "emDia"
                    : dadosCobranca.status.trim() === "Pendente"
                      ? "pendente"
                      : "inamdiplente"
                }
              >
                {dadosCobranca.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetalhesCobrancas;
