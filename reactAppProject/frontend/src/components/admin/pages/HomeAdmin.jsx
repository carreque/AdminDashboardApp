import homeadmin from '../../../styles/homeadmin.css';
import { Chart } from '../Dashboard/Chart';
import { Featured } from '../Dashboard/Feature';
import { Navbar } from '../Dashboard/Navbar';
import { Sidebar } from '../Dashboard/Sidebar';
import { Widget } from '../Dashboard/Widget';
import { useEffect, useState } from 'react';
import { getCategories, getUsers, getMeanPrice, getDiaryBills, getLastOrders } from '../../../services/homeAdminService';
import { Link } from 'react-router-dom';
export const HomeAdmin = () => {

    const [categories, setCategories] = useState(null);
    const [usuarios, setUsuarios] = useState(null);
    const [mediaPrecio, setMediaPrecio] = useState(null);
    const [todayBills, setTodayBills] = useState(null);
    const [lastBill, setLastBills] = useState(null);

    useEffect( () => {
        Promise.all([
            getCategories(),
            getUsers(),
            getMeanPrice(),
            getDiaryBills(),
            getLastOrders()
        ]).then((values) => {
            setCategories(values[0]);
            setUsuarios(values[1]);
            setMediaPrecio(values[2]); 
            setTodayBills(values[3]);
            setLastBills(values[4]);
         }).catch(error => {
            throw new Error(error);
         })

    }, []);

    return (

        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Link to={'/admin/Usuarios'} className='LinkWidget'><Widget key={1} type="user" numeroActual={Array.isArray(usuarios) ? usuarios.length : 0} /></Link>
                    <Link to={'/admin/Productos'} className='LinkWidget'><Widget key={2} type="products" numeroActual={Array.isArray(categories) ? categories.length : 0} /></Link>
                    <Link to={'/admin/precios'} className='LinkWidget'><Widget key={3} type="Precios" numeroActual={mediaPrecio} /></Link>
                    <Link to={'/admin/bills'} className='LinkWidget'><Widget key={4} type="ventasDiarias" numeroActual={Array.isArray(todayBills) ? todayBills.length : 0} /></Link>
                </div>
                <div className="charts">
                    <Featured />
                    <Chart />
                </div>
                <div className='card mt-5'>
                    <div className="card-header">
                        <h4 className='text-center'>Últimas Facturas</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Referencia</th>
                                        <th>Mesa</th>
                                        <th>Total base</th>
                                        <th>Total</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lastBill?.map((item) =>{

                                            return(
                                                <div key={item.id}>
                                                    <td scope="col">{item.Referencia}</td>
                                                    <td scope="col">{item.id_mesa}</td>
                                                    <td scope="col">{item.total_base}</td>
                                                    <td scope="col">{item.total}</td>
                                                    <td scope="col">{substring(item.created_at, 0,10)}</td>
                                                </div>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}