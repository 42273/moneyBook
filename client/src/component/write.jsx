import { useRef, useState } from "react";

function Write({ historyApi, handleClose, handleRefresh }) {
    const input = useRef([]);



    const [paySel, setPaySel] =useState("card")

    const handleSetPay = evt=>{
        setPaySel(evt.target.id)
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let data = {}
        for (let i = 0; i < input.current.length-1; i++) {
                data[input.current[i].id] = input.current[i].value;
        }
        data.token = localStorage.getItem("token");
        data["payby"] = paySel;
        console.log(data)
        const result = await historyApi.write(data)
        console.log(result)
        if (result.result) {
            console.log(result.data)
            handleRefresh()
        }
        handleClose(false);
    }
const sortList = [
    "식비","주거/통신","생활용품","의복/미용","건강/문화","교통/차량","용돈/기타","미분류"
]

    return (


        <>
            <form onSubmit={handleSubmit} className="form-control-sm">
                <div className="form-floating mb-3 mt-3 " >
                    <input type="date" className="form-control" name="date" id="date" ref={e => input.current[0] = e} defaultValue={new Date().toJSON().slice(0, 10)} />
                    <label htmlFor="email">소비날짜</label>
                </div>

                <div className="form-floating mt-3 mb-3">
                    <input type="text" className="form-control" name="content" id="content"  ref={e => input.current[1] = e} />
                    <label htmlFor="pwd">사용내역</label>
                </div>

                <div className="form-floating mt-3 mb-3">
                    <select className="form-control" name="sort" id="sort" ref={e => input.current[2] = e} defaultValue={"미분류"}>
                    {sortList.map(e=><option value={e} key={e}>{e}</option>)}
                    </select>
                    <label htmlFor="pwd">분류</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="payBy" id="cash"  onClick={handleSetPay}ref={e => input.current[5] = e}/>
                    <label className="form-check-label" htmlFor="cash">
                        현금지불
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="payBy" id="card" onClick={handleSetPay}ref={e => input.current[5] = e} defaultChecked />
                    <label className="form-check-label" htmlFor="card">
                        카드지불
                    </label>
                </div>
                <div className="form-floating mt-3 mb-3">
                    <input type="number" className="form-control" name="cost" id="cost" ref={e => input.current[3] = e} />
                    <label htmlFor="cost">금액</label>
                </div>
                <div className="form-floating mt-3 mb-3">
                    <input type="text" className="form-control" name="remark" id="remark" ref={e => input.current[4] = e} />
                    <label htmlFor="remark">비고</label>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>
        </>
    );

}

export default Write;