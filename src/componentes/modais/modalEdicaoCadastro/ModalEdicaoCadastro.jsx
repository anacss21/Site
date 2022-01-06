import './style.css';
import { useState } from 'react';
import fechar from '../../../assets/modais/fechar.svg';
import cadastroAlterado from '../../../assets/modais/cadastroAlterado.svg'
import senhaEscondida from '../../../assets/modais/senhaEscondida.svg';
import senhaMostrada from '../../../assets/modais/senhaMostrada.svg';
import useUsersList from '../../../hooks/useUsersList';
import InputMask from 'react-input-mask';

function ModalEdicaoCadastro() {

    const {
        edicaoCadastroAberta,
        setEdicaoCadastroAberta,
        confirmarSenhaInput,
        setConfirmarSenhaInput,
        handleEditaUsuario,
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
        setMensagem,
        setSucesso,
        handleMostraMensagem,
        mostraConfirmacaoEdicao,
        token
    } = useUsersList();

    const [mostraNovaSenha, setMostraNovaSenha] = useState(false);
    const [mostraConfirmarSenha, setMostraConfirmarSenha] = useState(false);

    const estiloBordaAlerta = {
        border: '1px solid #E70000'
    };
    const estiloBordaNormal = {
        border: '1px solid #D0D5DD'
    };

    const handleTelefoneMask = () => {
        if (telefone) {
            if (telefone[4] === "9") {
                return ("(99)99999-9999")
            }
        }
        return ("(99)9999-9999")
    }

    const handleTelefoneSize = () => {
        if (telefone) {
            if (telefone[4] === "9") {
                return ("11")
            }
        }
        return ("10")
    }

    const handleAplicaEdicaoUsuario = (e) => {
        e.preventDefault()

        if (cpf && cpf.replace(/\D/g, '').length < 11) {
            setSucesso(false);
            setMensagem("Cpf invalido");
            handleMostraMensagem();
            return;
        }

        if (telefone && telefone.replace(/\D/g, '').length < handleTelefoneSize()) {
            setSucesso(false);
            setMensagem("Telefone invalido");
            handleMostraMensagem();
            return;
        }

        if (novaSenhaInput !== confirmarSenhaInput) {
            setSucesso(false);
            setMensagem("As senhas não coincidem");
            handleMostraMensagem();
            return;
        }
        if (novaSenhaInput.length < 6 && novaSenhaInput.length > 0) {
            setSucesso(false);
            setMensagem("A senha deve ter pelo menos 6 caracteres");
            handleMostraMensagem();
            return;
        }
        handleEditaUsuario(token);

    }

    return (
        <div className={edicaoCadastroAberta ? "fundoModal" : ""}>
            <div className={mostraConfirmacaoEdicao ? 'esconde' : "contemModal"}>
                <div className="cabecalhoModal">
                    <h2>Edite seu cadastro</h2>
                    <img className="fechaModal" src={fechar} alt='x' onClick={() => setEdicaoCadastroAberta(false)} />
                </div>

                <form onSubmit={(e) => handleAplicaEdicaoUsuario(e)} >
                    <div className="contemInputsModal">
                        <label for="nome" >Nome*</label>
                        <input
                            id="nome"
                            type="text"
                            style={nome ? estiloBordaNormal : estiloBordaAlerta}
                            placeholder="Digite seu nome"
                            onChange={(event) => setNome(event.target.value.replace(/[^A-Za-z ]/g, ""))}
                            value={nome}
                        />
                        <span className="alerta">{nome ? '' : 'Este campo deve ser preenchido'}</span>
                        <label for="email">Email*</label>
                        <input
                            id="email"
                            type="text"
                            style={email ? estiloBordaNormal : estiloBordaAlerta}
                            placeholder="Digite seu e-mail"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                        <span className="alerta">{email ? '' : 'Este campo deve ser preenchido'}</span>
                        <div className="contemInputsMenores">
                            <div className="contemInputMenor">
                                <label for="novo-cpf">CPF</label>
                                <InputMask
                                    mask="999.999.999-99"
                                    id="novo-cpf"
                                    type="text"
                                    placeholder="Digite seu CPF"
                                    onChange={(event) => setCpf(event.target.value)}
                                    value={cpf}
                                />
                            </div>
                            <div className="contemInputMenor">
                                <label for="novo-telefone">Telefone</label>
                                <InputMask
                                    mask={handleTelefoneMask()}
                                    id="novo-telefone"
                                    type="text"
                                    placeholder="Digite seu Telefone"
                                    onChange={(event) => setTelefone(event.target.value)}
                                    value={telefone}
                                />
                            </div>
                        </div>

                        <div className="contemInputSenha">
                            <label for="nova-senha">Nova Senha</label>
                            <input
                                id="nova-senha"
                                type={mostraNovaSenha ? "text" : "password"}
                                placeholder="Ex: ••••••••"
                                onChange={(event) => setNovaSenhaInput(event.target.value)}
                                value={novaSenhaInput}
                            />
                            <img
                                onClick={() => setMostraNovaSenha(!mostraNovaSenha)}
                                src={mostraNovaSenha ? senhaMostrada : senhaEscondida}
                                alt="senha-escondida"
                                className="botaoMostraSenha"
                            />
                        </div>
                        <div className="contemInputSenha">
                            <label for="confirmar-senha">Confirmar Senha*</label>
                            <input
                                id="confirmar-senha"
                                type={mostraConfirmarSenha ? "text" : "password"}
                                style={novaSenhaInput && !confirmarSenhaInput ? estiloBordaAlerta : estiloBordaNormal}
                                placeholder="Ex: ••••••••"
                                onChange={(event) => setConfirmarSenhaInput(event.target.value)}
                                value={confirmarSenhaInput}
                            />
                            <span className="alerta">{novaSenhaInput && !confirmarSenhaInput ? 'Este campo deve ser preenchido' : ''}</span>
                            <span className="alerta">{novaSenhaInput !== confirmarSenhaInput && confirmarSenhaInput ? 'As senhas não coincidem' : ''}</span>
                            <span className="alerta">{cpf && cpf.replace(/\D/g, '').length < 11 ? 'Informe um cpf valido' : ''}</span>
                            <span className="alerta">{telefone && telefone.replace(/\D/g, '').length < handleTelefoneSize() ? 'Informe um telefone valido' : ''}</span>
                            <img
                                src={mostraConfirmarSenha ? senhaMostrada : senhaEscondida}
                                alt="senha-escondida"
                                className="botaoMostraSenha"
                                onClick={() => setMostraConfirmarSenha(!mostraConfirmarSenha)}
                            />
                        </div>
                        <div className="contemAplicar">
                            <button className="aplicaEdicaoCadastro" >Aplicar</button>
                        </div>
                    </div>
                </form >
            </div>
            {mostraConfirmacaoEdicao &&
                <div className="contemConfirmacaoEdicao" onClick={() => setEdicaoCadastroAberta(false)}>
                    <img src={fechar} alt="fechar" className="fecharConfirmacaoEdicao" />
                    <img className={mostraConfirmacaoEdicao ? "confirmaEdicao" : 'esconde'}
                        src={cadastroAlterado}
                        alt="sucesso"
                    />
                </div>
            }

        </div>

    );
}

export default ModalEdicaoCadastro;
