import { Navbar } from '../Dashboard/Navbar';
import { Sidebar } from '../Dashboard/Sidebar';
import bills from '../../../styles/bills.css';
import { useState } from 'react';

export const BillsAdmin = () => {

    const [numPagesBills, setNumPagesBills] = useState(5);

    const handleChangePages = (e) => {

        setNumPagesBills(e.target.value);
    }
    return (
        <div className='d-flex'>
            <Sidebar/>
            <div className='billsContainer'>
                <Navbar/>
                <div className='col-12 d-flex'>
                    <div class="col-6 d-flex p-4">
                        <label className="form-label">Número de Páginas: </label>
                        <select className='form-control ms-3' id="filterBillsPages" onChange={(e) => handleChangePages(e)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="col-6 text-end p-2">
                        <button className="btn btn-primary me-5" id="dateFiltrado">Filtrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}