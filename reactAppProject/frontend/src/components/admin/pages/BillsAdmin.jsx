import { Navbar } from '../Dashboard/Navbar';
import { Sidebar } from '../Dashboard/Sidebar';
import bills from '../../../styles/bills.css';
import { useState } from 'react';
import { getAllBills} from '../../../services/billsService';
import { useEffect } from 'react';
import { DatatableBills } from '../Dashboard/DatatableBills';
export const BillsAdmin = () => {

    const [numPagesBills, setNumPagesBills] = useState(5);
    const [bills, setBills] = useState(null);

    useEffect(() => {

        getAllBills()
            .then((result) => setBills(result))
            .catch((error) => {
                throw new Error(error)
            })
    }, []);

    const handleChangePages = (e) => {

        setNumPagesBills(e.target.value);
    }

    return (
        <div className='d-flex'>
            <Sidebar/>
            <div className='billsContainer'>
                <Navbar/>
                <div className='col-12 d-flex'>
                    <div className="col-6 d-flex p-4">
                        <label className="form-label">Número de Páginas: </label>
                        <select className='form-control ms-3 text-center' id="filterBillsPages" onChange={(e) => handleChangePages(e)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="col-6 text-end p-2">
                        <button className="btn btn-primary me-5" id="dateFiltrado">Filtrar</button>
                    </div>
                </div>

                <DatatableBills numRows={numPagesBills} Rows={bills}/>
            </div>
        </div>
    )
}