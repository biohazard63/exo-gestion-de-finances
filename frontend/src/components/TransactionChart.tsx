import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function TransactionChart({ transactions }) {
    // Prepare the data for charting
    const data = {
        labels: transactions.map(tx => new Date(tx.created_at).toLocaleDateString()),
        datasets: [{
            label: 'Transaction Amount',
            data: transactions.map(tx => tx.amount),
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    };

    return (
        <Bar data={data} options={options} />
    );
}

export default TransactionChart;