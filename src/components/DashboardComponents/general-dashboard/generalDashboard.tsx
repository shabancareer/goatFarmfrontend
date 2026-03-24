import { useState, type JSX } from "react";
// import v1 from "../../../assets/goatvideos/generalDashboard.mp4";
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
        <div className="bg-panel h-full w-full">

            {/* LEFT SIDE BUTTONS */}
            <div className="w-1/6 flex flex-col mt-16 gap-4">

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 mx-3 rounded"
                    onClick={() => setActivePage("Sick Goats")}
                >
                    Sick Goats
                </button>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 mx-3 rounded"
                    onClick={() => setActivePage("Pregnant Goats")}
                >
                    Pregnant Goats
                </button>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 mx-3 rounded"
                    onClick={() => setActivePage("Feed Stock")}
                >
                    Feed Stock
                </button>

                <button
                    onClick={() => setActivePage("Profit This Month")}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 mx-3 rounded"
                >
                    Profit This Month
                </button>

                <button
                    onClick={() => setActivePage("Kids Born This Month")}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 mx-3 rounded"
                >
                    Kids Born This Month
                </button>

                <button
                    onClick={() => setActivePage("Goats Ready For Breeding")}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 mx-3 rounded"
                >
                    Goats Ready For Breeding
                </button>

                <button
                    onClick={() => setActivePage("Daily Feed Uses")}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 mx-3 rounded"
                >
                    Daily Feed Uses
                </button>

            </div>


            {/* RIGHT SIDE CONTENT */}
            <div className="w-full h-full border-y-4 border-r-4 border-orange-300 bg-neutral-100">

                {!activePage && (
                    <h1 className="p-4 text-xl">General Dashboard</h1>
                )}

                {activePage && pages[activePage]}

            </div>

        </div>
    )
}