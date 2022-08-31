import chart from '../../../styles/chart.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { getEarnLastSixMonth, datosGrafica } from '../../../services/chartService';

export const Chart = () => {
    
    const [datosSixMonth, setDatosSixMonth] = useState(null);

    useEffect(() => {
        getEarnLastSixMonth()
        .then(resultado => setDatosSixMonth(resultado))
        .catch((error) => {

            throw new error(error);
        })
    }, []);
    
    return (
        <div className="chart">
            <div className="titleChart">Últimos 6 meses</div>
            <ResponsiveContainer width="100%" aspect={2 / 1}>
                <AreaChart width={730} height={250} data={Array.isArray(datosSixMonth) ? datosGrafica(datosSixMonth[1], datosSixMonth[0]) : 0}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
