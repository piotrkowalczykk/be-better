import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "../../features/customer/pages/Dashboard";
import { Unauthorized } from "../../features/auth/pages/Unauthorized";
import { RoleBasedRoute } from "../routes/RoleBasedRoute";
import { Login } from "../../features/auth/pages/Login";
import { Home } from "../../features/landing/pages/Home/Home"

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route 
            path="/dashboard" 
            element={
              <RoleBasedRoute role="USER">
                <Dashboard />
              </RoleBasedRoute>
            } 
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
      </Routes>
    </Router>
  )
}

