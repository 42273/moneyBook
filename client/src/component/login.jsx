import { Alert } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setLogon, accountApi , setLoading }) {

  const email = useRef();
  const pw = useRef();
  const nav = useNavigate();

  const [error, setError] = useState(false)
  useEffect(()=>{
    setLoading(false)
  },[]);
  
  const handleSubmit = evt => {
    evt.preventDefault();

    accountApi.auth(email.current.value, pw.current.value)
      .then(receive => {
        if (receive.result) {
          setLogon(email.current.value);
          localStorage.setItem("token", receive.token)
          nav("/")
        } else {
          setError(true);
          window.location.reload();
        }
      })
      .catch(e => console.log(e))

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3 mt-3">
        <input ref={email} type="text" className="form-control" id="email" placeholder="Enter email" 
        defaultValue={"asdsf@a.b.com"} 
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-floating mt-3 mb-3">
        <input ref={pw} type="password" className="form-control" id="pwd" placeholder="Enter password" />
        <label htmlFor="pwd">Password</label>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-block">Submit</button>
      </div>
      {error && <div className="form-floating mb-3 mt-3">
        <Alert variant="info">
          <i>  LOGIN ERROR !!</i>
        </Alert>
      </div>}
    </form>);
}

export default Login;