import { useContext } from "react";
import {  Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import {Route,Routes} from "react-router-dom"

const ProtectedRoute = ({children, ...rest}) =>{

  let {user} = useContext(AuthContext)
  return(
      user ? <Outlet/>: <Navigate to={'login'}/>
  )
}


export default ProtectedRoute;