import "./style.css";

function CardCobrancas({ tipoCobranca, valor, imagem }) {
  return (
    <div className={`containerCardCobrancas card${tipoCobranca}`}>
      <img src={imagem} alt={`Cobranças ${tipoCobranca}`} />
      <div>
        <p>{`Cobranças ${tipoCobranca}`}</p>
        <span>{`R$ ${(valor / 100)
          .toFixed(2)
          .toString()
          .replace(".", ",")}`}</span>
      </div>
    </div>
  );
}

export default CardCobrancas;
