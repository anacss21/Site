import "../modalExcluirCobrancas/style.css";
import excluir from "../../../assets/modais/excluir.svg";
import fechar from "../../../assets/modais/fechar.svg";
import useUsersList from "../../../hooks/useUsersList";

export default function ModalExcluirCobranca({ dadosCobranca }) {
  const {
    setModalExcluirCobranca,
    handleDeletarCobrancasCliente,
    setExcluirCobranca,
  } = useUsersList();

  return (
    <div className="fundoModalExcluir">
      <div className="modalExcluir">
        <div className="modalFechar">
          <img
            src={fechar}
            alt=""
            onClick={() => {
              setModalExcluirCobranca(false);
            }}
          />
        </div>
        <div className="modalAlerta">
          <img src={excluir} alt="" />
        </div>
        <p className="modalParagrafo">
          Tem certeza que deseja excluir esta cobrança?
        </p>
        <div className="modalBtn">
          <button
            className="btnNao"
            onClick={() => {
              setModalExcluirCobranca(false);
              setExcluirCobranca([]);
            }}
          >
            Não
          </button>
          <button
            className="btnSim"
            onClick={() => {
              handleDeletarCobrancasCliente(dadosCobranca.cobranca_id);
            }}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
