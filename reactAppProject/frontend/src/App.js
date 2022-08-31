import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { PanelAdmin } from './components/admin/PanelAdmin';
import { Login } from './components/auth/Login';
import { ProtectedRoutesAdmin } from './components/auth/ProtectedRoutesAdmin';
import { ProtectedRoutesUser } from './components/auth/ProtectedRoutesUser';
import { Register } from './components/auth/Register';
import { HomeUser } from './components/users/HomeUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} exact/>
        <Route path="/register" element={<Register/>} exact/>
        <Route element={<ProtectedRoutesAdmin/>}>
            <Route path="/admin/*" element={<PanelAdmin/>}/> 
        </Route>
        <Route element={<ProtectedRoutesUser/>}>
            <Route path="/user/*" element={<HomeUser/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
