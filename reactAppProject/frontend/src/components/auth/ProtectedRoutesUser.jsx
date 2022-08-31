import {Outlet, Navigate} from 'react-router-dom'

export const ProtectedRoutesUser = () => {

    const localStorageInfo = window.localStorage.getItem('loggedInfoUser');
    return localStorageInfo ?  (<Outlet/>) :  (<Navigate to={'/'}/>);
}