// import d1 from "../../assets/goatsImgs/d-1.jpg"
import { useState, type JSX } from "react";
import MasterEntry from "../../master-entry/components/MasterEntry"
import TagChange from "../../master-entry/components/TagChange"
import ManageWeight from "../../master-entry/components/ManageWeight"
import BreedingRecord from "../../master-entry/components/ManageBreeding"
import ManageExpenseType from "../../master-entry/components/ManageExpenseType"
import ManageBreed from "../../master-entry/components/ManageBreed"
import ManageMedicine from "../../master-entry/components/ManageMedicine"
import ManageDisease from "../../master-entry/components/ManageDisease"
import ManageFarmer from "../../master-entry/components/ManageFarmer"
import ManageCustomer from "../../master-entry/components/ManageCustomer"
import ManageCity from "../../master-entry/components/ManageCity"
import ManageBank from "../../master-entry/components/ManageBank"
import HerdManagement from "../../herd-management/components/HerdManagement"
import HerdM from "../../herd-management/components/HerdM"
import HealthVaccination from "../../health-vaccination/components/Health-Vaccination"
import AddAnimalForm from "../../master-entry/components/AddAnimalForm"
import FeedInventory from "../../feed-inventory/components/Feed-inventory"
import SalesRevenue from "../../sales-revenue/components/Sales-revenue"
import ReportsAnalysis from "../../reports-analytics/components/Reports-analysis"
import AlertsNotifications from "../../alerts-notifications/components/Alerts-notifications"
import GeneralDashboard from "../components/generalDashboard"
import type { DashboardPages } from "../types/dashboardPages"
import Logout from "../../auth/components/Logout"
import ProfileSetting from "../../settings/pages/ProfileSettings"
import EmployeManagment from "../../settings/components/EmployeeManagement";
// import "../styles/panel.css";
import d1 from "../../../assets/goatsImgs/d-1.jpg";
// import ManageGoats from "../../features/manageGoats/manageGoats"


export default function Home() {
    const [activePage, setActivePage] = useState<DashboardPages>("General Dashboard")
    const pages: Partial<Record<DashboardPages, JSX.Element>> = {
        "General Dashboard": <GeneralDashboard onNavigate={(page) => setActivePage(page)} />,
        "Tag Change": <TagChange />,
        "Manage Breeding": <BreedingRecord />,
        "Manage Animal": <AddAnimalForm />,
        "Manage Weight": <ManageWeight />,
        "Manage Expense Type": <ManageExpenseType />,
        "Manage Breed": <ManageBreed />,
        "Manage Medicine": <ManageMedicine />,
        "Manage Disease": <ManageDisease />,
        "Manage Farmer": <ManageFarmer />,
        "Manage Customer": <ManageCustomer />,
        "Manage City": <ManageCity />,
        "Manage Bank": <ManageBank />,
        "Herd": <HerdM />,
        "Employe Managment": <EmployeManagment />,
        // "GeneralDashboard": <GeneralDashboard />,
        // other pages
    };

    return (
        <div className="w-full h-full flex flex-row  overflow-x-hidden">
            <div className="flex-[1] max-w-[16.6667%] h-full border-r-[4px] border-orange-300 flex flex-col justify-center overflow-y-hidden">
                <div className="bg-panel h-full w-full"
                    style={{
                        "--bg-image": `url(${d1})`,
                        "--overlay-color": "rgba(0,0,0,0.2)"
                    } as React.CSSProperties}

                >
                    <div className="flex flex-col h-full mt-16 justify-start gap-6">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                            onClick={() => setActivePage("General Dashboard")}
                        >
                            General Dashboard
                        </button>
                        <HealthVaccination />
                        <FeedInventory />
                        <SalesRevenue />
                        <ReportsAnalysis />
                        <AlertsNotifications />
                        <HerdManagement onNavigate={(page) => setActivePage(page)} />
                        <MasterEntry onNavigate={(page) => setActivePage(page)} />
                        <EmployeManagment />
                        <div className="flex flex-col justify-center items-center h-full w-full gap-2">
                            <div className="flex flex-col justify-center gap-2 cursor-pointer">
                                <ProfileSetting />
                                <Logout />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-5/6 h-full border-y-4 border-r-4 border-orange-300 bg-neutral-100">
                {pages[activePage]}
                {/* {activePage && pages[activePage]} */}
                {/* {!activePage && <GeneralDashboard />} */}
            </div>
        </div >
    )
}