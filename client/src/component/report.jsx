import { useEffect, useRef, useState } from "react";
import ReportChart from "./reportChart";
import ReportSChart from "./reportSChart";

function Report({ historyApi, setLoading }) {
    const [range, setRange] = useState({});
    const [datas, setDatas] = useState([]);
    const [sort, setSort] = useState([])
    const beginRef = useRef();
    const endRef = useRef();

    const sortList = [
        "식비", "주거/통신", "생활용품", "의복/미용", "건강/문화", "교통/차량", "용돈/기타", "미분류"
    ];
    const handleSortChange = evt => {
        let newOne = [];
        if(sort.includes(evt.target.value)){
            sort.forEach(e => {
                if(e!==evt.target.value){
                    newOne.push(e)}        })
        setSort(newOne)
        }else{
            newOne=[...sort,evt.target.value]
        setSort(newOne)
        }
    }
    const sorted = sortList.map(e => {
        return (
            <div className="form-check" key={e + 1} >
                <input className="form-check-input" type="checkbox" value={e} id={e}  defaultChecked />
                <label className="form-check-label" htmlFor={e}>{e}</label>
            </div>
        )
    })
    const handleChange = (evt) => {
        setRange({ ...range, [evt.target.name]: evt.target.value });
    }
    useEffect(() => {
        endRef.current.value = new Date().toISOString().slice(0, 10);
        beginRef.current.value = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);
        setRange({ begin: beginRef.current.value, end: endRef.current.value });
    }, []);
    useEffect(() => {
        setLoading(true)
        if (!(range.begin && range.end)) {
            setLoading(false)
            return;
        }
        historyApi.search(range.begin, range.end,sort).then((recv => {
            if (recv.result) {
                setDatas(recv.datas);
                setLoading(false)
            } else {
                setLoading(false)
            }
        }));
    }, [range,sort])

    useEffect(() => {
        setSort(sortList)
    }, [])
    return (<div>
        <div className="input-group mb-3">
            <span className="input-group-text">검색기간</span>
            <input type="date" className="form-control" name="begin"
                onChange={handleChange} ref={beginRef} />
            <span className="input-group-text"> ~ </span>
            <input type="date" className="form-control" name="end"
                onChange={handleChange} ref={endRef} />
        </div>
        <div className="form-floating float-end d-flex" onChange={handleSortChange}>
            {sorted}
            <hr />
        </div>
        <div>
        <ReportChart datas={datas} sort={sortList}/>
        <ReportSChart datas={datas} sort={sortList} />
        </div>
    </div>);
}

export default Report;