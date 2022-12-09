import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Toast from 'react-bootstrap/Toast';

function Register({ accountApi }) {
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const birth = useRef();
    const gender = useRef();

    const nav = useNavigate()
    const [show, setShow] = useState(false);

    const handleSubmit = async evt => {
        //action="http://127.0.0.1:8080/api/account/register" method="post"
        evt.preventDefault();
        const em = email.current.value;
        const pw = password.current.value;
        const nm = name.current.value;
        const bt = birth.current.value;
        const gen = gender.current.value;
        const response = await accountApi.register(em, pw, nm, gen, bt);
        if (response.result) {
            nav("/login");
        } else {
            // setError(true);
            setShow(true)
        }
    }

    return (
        <>
            <br />
            <h2>REGISTER</h2>
            <hr />
            <form className="row g-3" onSubmit={handleSubmit} >
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder="Enter Your E-Mail" ref={email} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="########" ref={password} />
                </div>

                <div className="col-12">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Your Name" ref={name} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="birth" className="form-label">Birth</label>
                    <input type="number" className="form-control" id="birth" placeholder="Enter Your Birth" min="1900" max={new Date().getFullYear()} ref={birth} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select id="gender" className="form-select" ref={gender}>
                        <option defaultValue="PRIVATE" value="private">비공개</option>
                        <option value="man">남</option>
                        <option value="woman">여</option>
                        <option value="ETC">기타</option>
                    </select>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>

            </form>

            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto"><i>Message</i></strong>
                </Toast.Header>
                <Toast.Body>
                    올바른 값을 입력해줘~~~!!
                </Toast.Body>
            </Toast>
        </>
    );
}

export default Register;