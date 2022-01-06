import { useNavigate } from "react-router-dom";
import "./styles.css"

function NaoEncontrado() {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/home")} className="background">

    </div>
  )
}

export default NaoEncontrado;