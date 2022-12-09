import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Index({ accountApi }) {
  const navigate = useNavigate();

  const moveHistory = () => {
    navigate("/history");
  }
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  })

  return (<div className="card mt-5" >
    <div className="card-body">
      <h4 className="card-title">{"Hello !"}</h4>
      <p className="card-text">Some example text some example text.</p>
      <a className="btn btn-primary" onClick={moveHistory}>Go to History</a>
    </div>
  </div>);
}

export default Index;