import {Routes, Route} from 'react-router-dom';
import { HomeAdmin } from './pages/HomeAdmin';
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
        </Routes>
    )
}