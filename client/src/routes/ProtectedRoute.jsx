import { Navigate } from "react-router-dom"
import { useUser } from "../contexts/UserContextProvider"

function ProtectedRoute({children}){
    const {token,loading}=useUser()
    if(loading){
        return <span className="text-white">Loading..</span>
    }
    if(token && !loading){
        return (children)
    }
    else{
       return(
        <Navigate to='/login' />
       )
    }
}

export default ProtectedRoute