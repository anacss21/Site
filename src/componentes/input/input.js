import { React, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useUsersList from '../../hooks/useUsersList';


export default function Input({ idInput, tipo }) {

  const { dadosLogin, setDadosLogin, dadosCadastro, setDadosCadastro } = useUsersList();

  const [valorTexto, setValorTexto] = useState('');
  const [valorEmail, setValorEmail] = useState('');
  const [valorSenha, setValorSenha] = useState({
    senha: '', mostrarSenha: false,
  });

  const [valorSenhaCadastro, setValorSenhaCadastro] = useState({
    senha: '', mostrarSenha: false,
  });
  const [valorConfirmarSenha, setValorConfirmarSenha] = useState({
    senha: '', mostrarSenha: false
  });
  const [valorEmailCadastro, setValorEmailCadastro] = useState('');

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = () => (event) => {

    if (tipo === 'valorSenha') {
      setValorSenha({ ...valorSenha, senha: event.target.value });
      setDadosLogin({ ...dadosLogin, senha: event.target.value });
    }

    if (tipo === 'valorEmail') {
      setValorEmail(event.target.value.toLowerCase())
      setDadosLogin({ ...dadosLogin, email: event.target.value.toLowerCase() });
    }

    if (tipo === 'valorTexto') {
      setValorTexto(event.target.value.replace(/[^A-Za-z ]/g, ""))
      setDadosCadastro({ ...dadosCadastro, nome: event.target.value.replace(/[^A-Za-z ]/g, "") });
    }

    if (tipo === 'valorEmailCadastro') {
      setValorEmailCadastro(event.target.value.toLowerCase())
      setDadosCadastro({ ...dadosCadastro, email: event.target.value.toLowerCase() });
    }

    if (tipo === 'valorSenhaCadastro') {
      setValorSenhaCadastro({ ...valorSenhaCadastro, senha: event.target.value });
      setDadosCadastro({ ...dadosCadastro, senha: event.target.value });
    }

    if (tipo === 'valorConfirmarSenha') {
      setValorConfirmarSenha({ ...valorConfirmarSenha, senha: event.target.value })
      setDadosCadastro({ ...dadosCadastro, confirmarSenha: event.target.value });
    }

  };

  const handleClickMostrarSenha = () => {

    if (tipo === 'valorSenha') {
      setValorSenha({
        ...valorSenha,
        mostrarSenha: !valorSenha.mostrarSenha
      });
    }
    if (tipo === 'valorSenhaCadastro') {
      setValorSenhaCadastro({
        ...valorSenhaCadastro,
        mostrarSenha: !valorSenhaCadastro.mostrarSenha
      });
    }

    if (tipo === 'valorConfirmarSenha') {
      setValorConfirmarSenha({
        ...valorConfirmarSenha,
        mostrarSenha: !valorConfirmarSenha.mostrarSenha
      });
    }
  }

  const handleTipo = () => {

    if (tipo === 'valorSenha') {
      return (
        valorSenha.mostrarSenha ? 'text' : 'password'
      )
    }

    if (tipo === 'valorSenhaCadastro') {
      return (
        valorSenhaCadastro.mostrarSenha ? 'text' : 'password'
      )
    }

    if (tipo === 'valorConfirmarSenha') {
      return (
        valorConfirmarSenha.mostrarSenha ? 'text' : 'password'
      )
    }

    if (tipo === 'valorEmail' || tipo === 'valorEmailCadastro') {
      return (
        "email"
      )
    }

    if (tipo === 'valorTexto') {
      return (
        'text'
      )
    }
  }

  const handleValue = () => {

    if (tipo === 'valorSenha') {
      return (
        valorSenha.senha
      )
    }

    if (tipo === 'valorSenhaCadastro') {
      return (
        setValorSenhaCadastro.senha
      )
    }

    if (tipo === 'valorConfirmarSenha') {
      return (
        valorConfirmarSenha.senha
      )
    }

    if (tipo === 'valorEmail') {
      return (
        valorEmail
      )
    }

    if (tipo === 'valorEmailCadastro') {
      return (
        valorEmailCadastro
      )
    }

    if (tipo === 'valorTexto') {
      return (
        valorTexto
      )
    }
  }

  const handlePlaceholder = () => {
    if (tipo === 'valorSenha') {
      return (
        valorSenha.mostrarSenha ? '••••••••' : 'Digite sua senha'
      )
    }

    if (tipo === 'valorSenhaCadastro') {
      return (
        valorSenhaCadastro.mostrarSenha ? '••••••••' : 'Digite sua senha'
      )
    }

    if (tipo === 'valorConfirmarSenha') {
      return (
        valorConfirmarSenha.mostrarSenha ? '••••••••' : 'Digite sua senha novamente'
      )
    }

    if (tipo === 'valorEmail') {
      return (
        "Digite seu e-mail"
      )
    }

    if (tipo === 'valorEmailCadastro') {
      return (
        "Digite seu e-mail"
      )
    }

    if (tipo === 'valorTexto') {
      return (
        "Digite seu nome"
      )
    }
  }

  const handleImagemOlho = () => {
    if (tipo === 'valorSenha') {
      return (
        valorSenha.mostrarSenha
      )
    }

    if (tipo === 'valorSenhaCadastro') {
      return (
        valorSenhaCadastro.mostrarSenha
      )
    }

    if (tipo === 'valorConfirmarSenha') {
      return (
        valorConfirmarSenha.mostrarSenha
      )
    }
  }

  const handleEndAdornment = () => {
    if (tipo === "valorSenha" || tipo === 'valorSenhaCadastro' || tipo === 'valorConfirmarSenha') {
      return (
        < InputAdornment position="end" >
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickMostrarSenha}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {handleImagemOlho() ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment >
      )
    }
    return ("")
  }

  return (
    <FormControl sx={{ width: '368px', }} variant="outlined">
      <OutlinedInput
        required
        id={idInput}
        type={handleTipo()}
        value={handleValue()}
        onChange={handleChange()}
        placeholder={handlePlaceholder()}
        endAdornment={handleEndAdornment()}
      />
    </FormControl >
  );
}