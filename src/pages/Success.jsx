import { useLocation, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import SuccessIcon from "../components/SuccessIcon";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state == null) {
    return navigate('/')
  }

  return (
    <Page pageName="successPage">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center mb-3">Votre commande a bien été enregistrée</h1>
            <div className="text-center mb-3 fs-3">Le numéro de la commande est : 
              <strong>{location.state.orderId}</strong>
            </div>
            <div style={{ height: "30vh" }}>
              <SuccessIcon />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Success
