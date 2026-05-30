import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import Transaction from "./pages/Transaction"
import AddTransaction from "./pages/AddTransaction"

function App() {
  return (
    <div className="bg-[#272c36] min-h-screen" >
      <Toaster
        position="top-right"
        toastOptions={{

          duration: 3000,

          style: {
            background: "#11141d",
            color: "#fff",
          },

          success: {
            iconTheme: {
              primary: "#49b8fc",
              secondary: "#11141d"
            }
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#11141d"
            }
          }
        }}
      />
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction/add"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App