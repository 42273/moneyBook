import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './component';
import Nav from './component/navbar';
import Login from './component/login';
import Register from './component/register';
import AccountApi from './service/accountAPI/AccountApi';
import History from './component/history';
import HistoryApi from './service/historyAPI/HistoryApi';
import Report from './component/report';
import Loading from './component/loading/loading';

const BASEURL = "http://43.201.78.144:8080"
const accountApi = new AccountApi(BASEURL)

function App() {
  const [logon, setLogon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyApi, setHistoryApi] = useState(new HistoryApi(BASEURL))

  useEffect(() => {
    if (!logon && localStorage.getItem("token")) {
      accountApi.valid(localStorage.getItem("token"))
        .then(receive => {
          if (receive.result) {
            setLogon(receive.owner);
            return console.log("로그인 유지");
          }
        })
    }
  })

  useEffect(() => {
    setHistoryApi(new HistoryApi(BASEURL))
  }, [localStorage.getItem("token")])

  const handleLogin = (value) => {
    setLogon(value)
    console.log(logon)
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Nav logon={logon} setLogin={handleLogin} />
        {loading && <Loading />}
        <br />
        <Routes>
          <Route path="/" element={<Index accountApi={accountApi} />} />
          <Route path="/login" element={<Login setLogon={handleLogin} accountApi={accountApi} setLoading={setLoading} />} />
          <Route path="/register" element={<Register accountApi={accountApi} />} />
          <Route path='/history' element={<History historyApi={historyApi} setLoading={setLoading} />} />
          <Route path='/report' element={<Report historyApi={historyApi} setLoading={setLoading} />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
