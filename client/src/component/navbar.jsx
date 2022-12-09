import { Link, useNavigate } from "react-router-dom"

function Header({ logon, setLogin }) {
  const navigate = useNavigate()
  const logoutHandle = evt => {
    if (logon) {
      evt.preventDefault();
      setLogin(null);
      localStorage.removeItem("token");
      navigate("/login")
    }
  }

  let home = (logon && localStorage.getItem("token")) ? "/" : "/login"
  return (<nav className="navbar navbar-expand-sm bg-light navbar-light">
    <div className="container-fluid">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={home} className="nav-link">HOME</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link" onClick={logoutHandle}>{!(logon) ? "Login" : "Logout"}</Link>
        </li>
        <li className="nav-item">
          {!logon && <Link to="/register" className="nav-link">Register</Link>}
          {logon && <Link to="/history" className="nav-link">History</Link>}
        </li>
        <li className="nav-item">
          {logon && <Link to="/report" className="nav-link">Report</Link>}
        </li>
      </ul>
      {logon && <span className="navbar-text w-20 overflow-hidden" >{logon}</span>}
    </div>
  </nav>
  );
}

export default Header;