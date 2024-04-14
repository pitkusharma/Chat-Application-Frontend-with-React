import { Navigate, Outlet } from 'react-router-dom'
import authorized from '../utils/auth'

export default function AuthorizedRoutes(){
    if (authorized())
        return <Outlet />
    else 
        return <Navigate to="/login" />
}