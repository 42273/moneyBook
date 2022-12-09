import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
function ReportSChart({ datas, sort }) {
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

    ChartJS.register(ArcElement, Tooltip, Legend);
let cardSum = 0
let cashSum = 0
dataSet[0].forEach(e=>cardSum+=e)
dataSet[1].forEach(e=>cashSum+=e)

const data = {
        labels: ['카드', '현금'],
        datasets: [
            {
                label: '# of pay',
                data: [cardSum,cashSum],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };

        return <Doughnut data={data} height={100}/>;
}

export default ReportSChart;