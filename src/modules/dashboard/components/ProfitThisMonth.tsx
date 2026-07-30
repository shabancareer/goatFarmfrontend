import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ProfitThisMonth() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <div className="bg-white w-[200px] h-[100px] shadow-md rounded-2xl flex items-center justify-center text-center font-semibold text-gray-700 hover:shadow-xl hover:scale-105 transition duration-200 cursor-pointer p-2">
            <div className="w-full h-full">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}
