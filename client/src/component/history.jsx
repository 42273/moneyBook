import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import HistoryBar from './historyBar';
import HistoryItem from './historyItem';
import Write from './write';



function History({ historyApi,setLoading }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [items, setItems] = useState([]);
    const monthRef = useRef();
    useEffect(() => {
        const month = new Date().toISOString().slice(0, 7);
        monthRef.current.value = month;
        if (localStorage.getItem("token")) {
            setLoading(true)
            historyApi.history(month, localStorage.getItem("token"))
                .then(received => {
                    if (received.result) {
                        setItems(received.datas);
                        setLoading(false)
                    }
                })
                .catch(e => {console.log(e.message, "초기설정에서 에러");setLoading(false)})
        }
    }, [historyApi])

    const sortList = [
        "식비", "주거/통신", "생활용품", "의복/미용", "건강/문화", "교통/차량", "용돈/기타", "미분류"
    ]
    const dataSet = function () {
        const arrCard = new Array(sortList.length).fill(0);
        const arrCash = new Array(sortList.length).fill(0);

        items.forEach(i => {
            if (i.payby === "card") {
                const index = sortList.indexOf(i.sort)
                arrCard[index] = arrCard[index] + i.cost
            } else {
                const index = sortList.indexOf(i.sort)
                arrCash[index] = arrCash[index] + i.cost
            }
        })
        return [arrCard, arrCash]
    }();

    const handleRefresh = async () => {
        const response = await historyApi.history(monthRef.current.value, localStorage.getItem("token"));
        if (response.result) {
            setItems(response.datas);
        }
    }
    const item = items.map(item => {
        return <HistoryItem data={item} key={item._id}
            handleRefresh={handleRefresh} historyApi={historyApi} />
    })
    const handleSearch = async evt => {
        evt.preventDefault();
        if (localStorage.getItem("token")) {
            setLoading(true)
            const response = await historyApi.history(monthRef.current.value, localStorage.getItem("token"));
            if (response.result) {
                setItems(response.datas);
                setLoading(false)
            }else{
                setLoading(false)
            }
        }
    }

    const handleEdit = async evt => {
        evt.preventDefault();
    }

    return (
        <>
            <div className='form-floating'>
                <input type="month" className='form-control' id='itemData' ref={monthRef} />
                <label htmlFor="itemData">월별검색</label>
            </div>
            <Button className='float-start m-2' variant='primary' onClick={handleEdit} >EDIT</Button>
            <div className='form d-flex flex-row-reverse m-2'>

                <Button variant='secondary' onClick={handleSearch} >SEARCH</Button>

                <Button variant="primary" onClick={handleShow}>
                    WRITE
                </Button>

            </div>
            {/* 원래위치 */}
            <hr />

            <HistoryBar datas={dataSet} />

            <div>
                {item ? item : ""}
            </div>

            <br />
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>소비내역 작성</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Write historyApi={historyApi} handleClose={handleClose}
                            handleRefresh={handleRefresh} />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}
export default History;
