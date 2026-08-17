// import d1 from "../../assets/goatsImgs/d-1.jpg"
import { useState, type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/index";
import { Role } from "../../../types/shared.types";
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
import ManageEmployeeTable from "../../settings/components/ManageEmployeeTable";
// import "../styles/panel.css";
import d1 from "../../../assets/goatsImgs/d-1.jpg";
import OrganizationSwitcher from "../../../shared/components/OrganizationSwitcher";
// import ManageGoats from "../../features/manageGoats/manageGoats"


export default function Home() {
    const [activePage, setActivePage] = useState<DashboardPages>("General Dashboard")
    const { user } = useSelector((state: RootState) => state.auth);

    // Only Super Owner has access to Employee Management
    const isSuperOwner = Boolean(user?.isSuperOwner || user?.role === Role.SUPER_OWNER);

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
        ...(isSuperOwner && { "Employe Managment": <ManageEmployeeTable /> }),
    };

    return (
        <div className="w-screen h-screen flex flex-row overflow-hidden bg-neutral-100">
            {/* LEFT SIDEBAR */}
            <div className="w-64 min-w-[200px] max-w-[280px] shrink-0 h-full border-r-4 border-orange-300 flex flex-col overflow-hidden">
                <div
                    className="bg-panel h-full w-full flex flex-col justify-between p-3 overflow-y-auto"
                    style={{
                        "--bg-image": `url(${d1})`,
                        "--overlay-color": "rgba(0,0,0,0.2)"
                    } as React.CSSProperties}
                >
                    <div className="flex flex-col gap-2.5 w-full">


                        <button
                            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-3 rounded text-sm w-full transition shadow"
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
                        {isSuperOwner && <EmployeManagment onNavigate={(page) => setActivePage(page as DashboardPages)} />}
                        {isSuperOwner && <OrganizationSwitcher />}
                    </div>

                    <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-white/20 w-full">
                        <ProfileSetting />
                        <Logout />
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 h-full overflow-hidden bg-neutral-100 relative">
                {pages[activePage]}
            </div>
        </div>
    )
}