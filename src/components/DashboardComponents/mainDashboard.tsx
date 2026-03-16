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
import type { DashboardPages } from "./types/dashboardPages"
import Logout from "../profileComponents/logout"
import ProfileSetting from "../profileComponents/profileSetting"
// import ManageGoats from "../../features/manageGoats/manageGoats"


export default function Home() {
    const [activePage, setActivePage] = useState<DashboardPages>()
    const pages: Partial<Record<DashboardPages, JSX.Element>> = {
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
        // other pages
    };

    return (
        <div className="w-full h-full flex flex-row">
            <div className="flex-[1] max-w-[16.6667%] h-full border-r-[4px] border-orange-300 flex flex-col justify-center overflow-y-hidden">
                <div className="goat-sidebar-bg h-full w-full" >
                    <div className="flex flex-col h-full mt-16 justify-start gap-6">
                        <HealthVaccination />
                        <FeedInventory />
                        <SalesRevenue />
                        <ReportsAnalysis />
                        <AlertsNotifications />
                        <HerdManagement onNavigate={(page) => setActivePage(page)} />
                        <MasterEntry onNavigate={(page) => setActivePage(page)} />
                        <div className="flex flex-col justify-center items-center h-full w-full gap-2 cursor-pointer">
                            <ProfileSetting />
                            <Logout />
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-5/6 h-full border-y-4 border-r-4 border-orange-300 bg-neutral-100">
                {/* {pages[activePage]} */}
                {activePage && pages[activePage]}
            </div>
        </div >
    )
}