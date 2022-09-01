import homeadmin from '../../../styles/homeadmin.css';
import { Chart } from '../Dashboard/Chart';
import { Featured } from '../Dashboard/Feature';
import { Navbar } from '../Dashboard/Navbar';
import { Sidebar } from '../Dashboard/Sidebar';
import { Widget } from '../Dashboard/Widget';
import { useEffect, useState } from 'react';
import { getCategories, getUsers, getMeanPrice, getDiaryBills } from '../../../services/homeAdminService';
import { Link } from 'react-router-dom';
export const HomeAdmin = () => {

    const [categories, setCategories] = useState(null);
    const [usuarios, setUsuarios] = useState(null);
    const [mediaPrecio, setMediaPrecio] = useState(null);
    const [todayBills, setTodayBills] = useState(null);
    useEffect( () => {
        Promise.all([
            getCategories(),
            getUsers(),
            getMeanPrice(),
            getDiaryBills()
        ]).then((values) => {
            setCategories(values[0]);
            setUsuarios(values[1]);
            setMediaPrecio(values[2]); 
            setTodayBills(values[3]);
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
            </div>
        </div>
    )
}