import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import './index.css'

import Home from './components/home/home.tsx'
import Dashboard from './components/DashboardComponents/mainDashboard.tsx'
import AnimalPanel from "./components/ManageAnimal/AnimalPanel.tsx";
import ManageGoats from "./features/manageGoats/manageGoats.tsx";
// import GeneralDashboard from "./components/DashboardComponents/general-dashboard/generalDashboard.tsx";
import Register from "./components/auth/Register.tsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: 'green',
              color: '#fff',
              width: "150px",
              height: "100px",
              borderRadius: "8px"
            },
          },
          error: {
            style: {
              background: 'red',
              color: '#fff',
              width: "150px",
              height: "100px",
              borderRadius: "8px"
            },
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="dashboard/generalDashboard" element={<GeneralDashboard />} /> */}
          <Route path="/dashboard/AnimalPanel" element={<AnimalPanel />} />
          <Route path="/dashboard/ManageGoats" element={<ManageGoats />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
