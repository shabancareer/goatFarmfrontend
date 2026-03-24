import { useState, type JSX } from "react";
import v1 from "../../../assets/goatvideos/generalDashboard.mp4";
import type { GeneralDashboardPages } from "../types/GeneralDashboard";
import SickGoats from "./SickGoats";
import PregnantGoats from "./PregnantGoats";
import FeedStock from "./FeedStock";
import ProfitThisMonth from "./ProfitThisMonth";
import KidsBornThisMonth from "./KidsBornThisMonth";
import GoatsReadyForBreeding from "./GoatsReadyForBreeding";
import DailyFeedUses from "./DailyFeedUses";
export default function GeneralDashboard() {
    // const navigate = useNavigate();
    const [activePage, setActivePage] = useState<GeneralDashboardPages>()
    const pages: Partial<Record<GeneralDashboardPages, JSX.Element>> = {
        "Sick Goats": <SickGoats />,
        "Pregnant Goats": <PregnantGoats />,
        "Feed Stock": <FeedStock />,
        "Profit This Month": <ProfitThisMonth />,
        "Kids Born This Month": <KidsBornThisMonth />,
        "Goats Ready For Breeding": <GoatsReadyForBreeding />,
        "Daily Feed Uses": <DailyFeedUses />,
        // "GeneralDashboard": <GeneralDashboard />,
        // other pages
    };
    return (
        <div
            className="bg-panel h-full w-full">
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover blur-sm"
            >
                <source src={v1} type="video/mp4" />
            </video> */}
            {/* Overlay / content */}
            <div className="flex flex-col h-full mt-16 justify-start gap-6">
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                    onClick={() => setActivePage("Sick Goats")}
                >
                    Sick Goats
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                    onClick={() => setActivePage("Pregnant Goats")}
                >
                    Pregnant Goats
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                    onClick={() => setActivePage("Feed Stock")}
                >
                    Feed Stock
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                    onClick={() => setActivePage("Profit This Month")}
                >
                    Profit This Month
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                    onClick={() => setActivePage("Kids Born This Month")}
                >
                    Kids Born This Month
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                    onClick={() => setActivePage("Goats Ready For Breeding")}
                >
                    Goats Ready For Breeding
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded"
                    onClick={() => setActivePage("Daily Feed Uses")}
                >
                    Daily Feed Uses
                </button>

                {/* <HerdManagement onNavigate={(page) => setActivePage(page)} /> */}
                {/* <GeneralDashboard onNavigate={(page) => setActivePage(page)} /> */}
                <div className="flex flex-col justify-center items-center h-full w-full gap-2">
                    <div className="flex flex-col justify-center gap-2 cursor-pointer">

                    </div>
                </div>
            </div>
            <div className="relative z-10 flex flex-col h-full w-full">
                <h1 className="text-white text-3xl p-4">General Dashboard</h1>
                <div className="w-5/6 h-full border-y-4 border-r-4 border-orange-300 bg-neutral-100">
                    {activePage && pages[activePage]}
                    {/* {!activePage && <GeneralDashboard />} */}
                </div>
                {/* Other dashboard components */}
            </div>
        </div>
    );
}