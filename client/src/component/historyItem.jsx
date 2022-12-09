import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import { useState } from 'react';
function HistoryItem({ data, handleRefresh, historyApi }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const date = data.date.slice(2, 10).split("-").join("/")

    const handleDelete = async (evt) => {
        if (localStorage.getItem("token")) {
            console.log(localStorage.getItem("token"));
            console.log(evt.target.value);
            const resp = await historyApi.delete(evt.target.value, localStorage.getItem("token"));
            console.log(resp);
            if (resp.result) {
                handleRefresh();
                handleClose(false);
                alert("complete!")
            }
        }
    }
    return (
        <>
            <div className='flex m-2'>
                <div>
                    <button className=" con-3 btn bg-secondary float-end text-white" onClick={handleShow}>X</button>
                    <div className='col-9'>
                        <h5> {date} <small>{data.sort}</small></h5>
                        <h6>    <b>[{data.payby==="card"?"카드":"현금"}]</b> {data.content}/{data.cost}</h6>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="form-floating">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>기록 삭제</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mt-4 p-5 text-secondary rounded">
                            <h1>{date}</h1>
                            <hr />
                            <p>사용 내역 : {data.content}</p>
                            <p>사용 분류 : {data.sort}</p>
                            <p>사용 금액 : {data.cost}</p>
                            <p>결제 방법 : {data.payby}</p>
                            <p><i>{data.email}</i></p>
                            <p>{data.remark}</p>
                            <div className="align-middle">
                                <br />
                                <br />
                                <Button className="col-sm-6 bg-primar" value={data._id} onClick={handleDelete}>DELETE</Button>
                                <Button className="col-sm-6 bg-dark" onClick={handleClose}>CANCEL</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default HistoryItem;