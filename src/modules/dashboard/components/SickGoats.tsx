import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

export default function SickGoats() {
    const data = [
        { name: 'Week 1', uv: 4000, pv: 2400 },
        { name: 'Week 2', uv: 3000, pv: 1398 },
        { name: 'Week 3', uv: 2000, pv: 9800 },
        { name: 'Week 4', uv: 2780, pv: 3908 },
        { name: 'Week 5', uv: 1890, pv: 4800 },
        { name: 'Week 6', uv: 2390, pv: 3800 },
        { name: 'Week 7', uv: 3490, pv: 4300 },
    ];

    return (
        <div className="bg-white w-[200px] h-[100px] shadow-md rounded-2xl flex items-center justify-center text-center font-semibold text-gray-700 hover:shadow-xl hover:scale-105 transition duration-200 cursor-pointer">
            <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} responsive data={data}>
                <CartesianGrid stroke="var(--color-border-3)" strokeDasharray="5 5" />
                <XAxis dataKey="name" stroke="var(--color-text-3)" />
                <YAxis width="auto" stroke="var(--color-text-3)" />
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="var(--color-chart-1)"
                    dot={{
                        fill: 'var(--color-surface-base)',
                    }}
                    activeDot={{
                        stroke: 'var(--color-surface-base)',
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="var(--color-chart-2)"
                    dot={{
                        fill: 'var(--color-surface-base)',
                    }}
                    activeDot={{
                        stroke: 'var(--color-surface-base)',
                    }}
                />
                <RechartsDevtools />
            </LineChart>

        </div>
    );
}
