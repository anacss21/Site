import { React } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom'
import Input from '../../componentes/input/input'

export default function Formulario({ valores, avancar }) {

  function handleSubmit(e) {
    e.preventDefault();
    avancar();
  }

  const handleTipo1 = () => {
    if (valores.login) {
      return (
        'valorEmail'
      )
    }
    if (valores.step2) {
      return (
        'valorSenhaCadastro'
      )
    }
    return (
      'valorTexto'
    )
  }

  const handleTipo2 = () => {
    if (valores.login) {
      return (
        'valorSenha'
      )
    }
    if (valores.step2) {
      return (
        'valorConfirmarSenha'
      )
    }
    return (
      'valorEmailCadastro'
    )
  }

  return (
    <div className='formulario'>
      <div className='estruturaCadastro'>
        <h1 className="tituloCadastro">{valores.titulo}</h1>
        <form className="rotuloCadastro" onSubmit={(e) => handleSubmit(e)}>
          <div className="contemInputSenha">
            <label htmlFor={valores.label} className="nomeLabel">{valores.label}</label>
            <Input idInput={valores.label} tipo={handleTipo1()} />
            <label htmlFor={valores.label2} className="nomeLabel">{valores.label3}</label>
            <Input idInput={valores.label2} tipo={handleTipo2()} />
            <div className="buttonFormulario">
              <button className='btnFormulario'> {valores.acao}</button>
            </div>
          </div>
        </form>
        <p className="rodapeLogin">{valores.textoRodape} <Link to={valores.login ? "/cadastro" : "/login"} > {valores.linkRodape}</Link></p>
      </div >
    </div >
  )
}
