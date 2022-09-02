import {Routes, Route} from 'react-router-dom';
import { BillsAdmin } from './pages/BillsAdmin';
import { HomeAdmin } from './pages/HomeAdmin';
import { OrderBillAdmin } from './pages/OrderBillAdmin';
import { PreciosAdmin } from './pages/PreciosAdmin';
import { ProductsAdmin } from './pages/ProductsAdmin';
import { UsersAdmin } from './pages/UsersAdmin';

export const PanelAdmin = () => {

    return (
        <Routes>
            <Route path="" element={<HomeAdmin/>} exact/>
            <Route path="productos" element={<ProductsAdmin/>} exact/>
            <Route path="precios" element={<PreciosAdmin/>} exact/>
            <Route path="usuarios" element={<UsersAdmin/>} exact/>
            <Route path="bills" element={<BillsAdmin/>} exact/>
            <Route path="bills/orderBills" element={<OrderBillAdmin/>} exact />
        </Routes>
    )
}