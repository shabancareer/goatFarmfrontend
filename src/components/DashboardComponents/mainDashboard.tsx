// import d1 from "../../assets/goatsImgs/d-1.jpg"
import { useState, type JSX } from "react";
import MasterEntry from "./MasterEntryComponents/MasterEntry"
import TagChange from "./MasterEntryComponents/TagChange"
import ManageWeight from "./MasterEntryComponents/ManageWeight"
import BreedingRecord from "./MasterEntryComponents/ManageBreeding"
import ManageExpenseType from "./MasterEntryComponents/ManageExpenseType"
import ManageBreed from "./MasterEntryComponents/ManageBreed"
import ManageMedicine from "./MasterEntryComponents/ManageMedicine"
import ManageDisease from "./MasterEntryComponents/ManageDisease"
import ManageFarmer from "./MasterEntryComponents/ManageFarmer"
import ManageCustomer from "./MasterEntryComponents/ManageCustomer"
import ManageCity from "./MasterEntryComponents/ManageCity"
import ManageBank from "./MasterEntryComponents/ManageBank"
import HerdManagement from "./HerdManagement"
import HerdM from "./HerdManagementComponents/HerdM"
import HealthVaccination from "./Health-Vaccination"
import AddAnimalForm from "./MasterEntryComponents/AddAnimalForm"
import FeedInventory from "./Feed-inventory"
import SalesRevenue from "./Sales-revenue"
import ReportsAnalysis from "./Reports-analysis"
import AlertsNotifications from "./Alerts-notifications"
import GeneralDashboard from "./general-dashboard/generalDashboard"
import type { DashboardPages } from "./types/dashboardPages"
import Logout from "../profileComponents/logout"
import ProfileSetting from "../profileComponents/profileSetting"
// import "../styles/panel.css";
import d1 from "../../assets/goatsImgs/d-1.jpg";
// import ManageGoats from "../../features/manageGoats/manageGoats"


export default function Home() {
    const [activePage, setActivePage] = useState<DashboardPages>("General Dashboard")
    const pages: Partial<Record<DashboardPages, JSX.Element>> = {
        "General Dashboard": <GeneralDashboard />,
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
        // "GeneralDashboard": <GeneralDashboard />,
        // other pages
    };

    return (
        <div className="w-full h-full flex flex-row">
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