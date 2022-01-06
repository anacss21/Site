import './style.css';
import useUsersList from '../../hooks/useUsersList';
import fechar from '../../assets/cardMensagem/erro.svg';

function CardMensagem() {
    const { sucesso, mensagem, setMostraMensagem } = useUsersList();
    return (
        <div
            className={sucesso ? `containerCardMensagem cardSucesso fixo` : `containerCardMensagem cardErro fixo`}
            onClick={() => setMostraMensagem(false)}
        >
            <img src={fechar} alt="fechar" />
            <span>{mensagem}</span>
        </div>
    );
}

export default CardMensagem;