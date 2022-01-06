import "../headerCobrancasEClientes/perfilUsuario.css";
import setaOpcoes from "../../assets/perfilUsuario/setaParaBaixo.svg";
import btnEditarCadastro from "../../assets/perfilUsuario/editar.svg";
import btnSairDaConta from "../../assets/perfilUsuario/sair.svg";
import useUsersList from "../../hooks/useUsersList";
import { useNavigate } from "react-router-dom";

function PerfilUsuario() {
  const navigate = useNavigate();

  const {
    imagemDoUsuario,
    siglaNomeUsuarioLogado,
    opcoesPerfilAberta,
    setOpcoesPerfilAberta,
    setEdicaoCadastroAberta,
    removeToken,
    setMostraConfirmacaoEdicao,
    handleGetDadosUsuario,
    token,
    usuarioLogado
  } = useUsersList();

  function logout() {
    removeToken();
    navigate("/");
  }
  const handleAbreEdicao = () => {
    setMostraConfirmacaoEdicao(false);
    setEdicaoCadastroAberta(true);
    handleGetDadosUsuario(token);
  };
  return (
    <div className={`containerPerfilUsuario`}>
      <span className="imagemPerfil">
        {siglaNomeUsuarioLogado}
        {imagemDoUsuario && <img src={imagemDoUsuario} alt="Usuario" />}
      </span>
      <p className="nomeUsuario">{usuarioLogado}</p>
      <div className="contemOpcoesPerfil">
        <img
          src={setaOpcoes}
          alt="seta modal editar e sair"
          className="abreOpcoesPerfil"
          onClick={() => setOpcoesPerfilAberta(!opcoesPerfilAberta)}
        />
        <div className={opcoesPerfilAberta ? "opcoesPerfil" : "hidden"}>
          <img
            className="separa16"
            src={btnEditarCadastro}
            alt="botão de edição"
            onClick={handleAbreEdicao}
          />
          <img
            src={btnSairDaConta}
            alt="botão de sair"
            onClick={() => logout()}
          />
        </div>
      </div>
    </div>
  );
}
//
export default PerfilUsuario;
