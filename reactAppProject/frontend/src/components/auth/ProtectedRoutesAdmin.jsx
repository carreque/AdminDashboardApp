import {Outlet, Navigate} from 'react-router-dom'

export const ProtectedRoutesAdmin= () => {

    const localStorageInfo = window.localStorage.getItem('loggedInfoUser');
    return localStorageInfo && JSON.parse(localStorageInfo).rol ? (<Outlet/>) : (<Navigate to={'/'}/>)
}