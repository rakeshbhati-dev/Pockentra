import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"

function App(){
  return(
    <div className="bg-[#272c36] min-h-screen" >
      <Routes>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  )
}

export default App