// 카드합
// 현금합
// verticallllllllllllllllllllllllllllllllll
// 카테고리이ㅣㅣㅣㅣ별로 ㅅ합계ㅒ 도넛파이ㅣㅣㅣ
//아무거나ㅏ
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
function ReportChart({ datas, sort }) {

    //데이터 분류 0카드 1현금
    const dataSet = function () {
        const arrCard = new Array(sort.length).fill(0);
        const arrCash = new Array(sort.length).fill(0);
        datas.forEach(i => {
            if (i.payby === "card") {
                const index = sort.indexOf(i.sort)
                arrCard[index] = arrCard[index] + i.cost
            } else {
                const index = sort.indexOf(i.sort)
                arrCash[index] = arrCash[index] + i.cost
            }
        })
        return [arrCard, arrCash]
    }()


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );


    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    const labels = sort;
    const data = {
        labels,
        datasets: [
            {
                label: 'card',
                data: dataSet[0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'cash',
                data: dataSet[1],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <>
            <Bar data={data} options={options} />
        </>
    );
}

export default ReportChart;