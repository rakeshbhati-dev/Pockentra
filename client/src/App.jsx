import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App(){
  return(
    <div className="bg-[#272c36] min-h-screen" >
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App