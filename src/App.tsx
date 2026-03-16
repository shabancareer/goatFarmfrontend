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
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/AnimalPanel" element={<AnimalPanel />} />
          <Route path="/dashboard/ManageGoats" element={<ManageGoats />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
