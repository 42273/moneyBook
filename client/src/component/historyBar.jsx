import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { useState } from 'react';
import {Bar} from "react-chartjs-2"

function HistoryBar({datas}) {

    const [visible, setVisible] = useState(true);
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const option = {
        plugins: {
            title: {
                display: true,
                text: "카테고리별 사용금액"
            }
        },
        scales :{
            x:{stacked :true},
            y:{stacked :true}
        },
        responsive:true
    }
    const data = {
        
        labels: ["식비","주거/통신","생활용품","의복/미용","건강/문화","교통/차량","용돈/기타","미분류"],
        datasets: [{
            label: "카드",
            data:datas[0],
            backgroundColor : "rgb(255,99,132)"
        },
        {
            label: "현금",
            data:datas[1],
            backgroundColor : "rgb(75,152,255)"

        }]
    }
    return (
        <>
    {visible && <Bar data={data} options={option}/>  }
    <div className="form-check form-switch ">
    <input className="form-check-input" onClick={() => { setVisible(!visible) }} type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{visible ? "숨기기" : "보이기"}</label>
</div>
        </>
);
}


export default HistoryBar;