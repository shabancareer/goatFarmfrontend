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
        <div className="relative h-full w-full overflow-hidden">
            {/* VIDEO BACKGROUND */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={v1} type="video/mp4" />
            </video>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* GLASS PANEL CONTAINER */}
            <div className="relative z-10 h-full w-full flex justify-center items-center">

                <div
                    className="backdrop-blur-md bg-white/10 shadow-xl rounded-xl flex flex-col gap-2 p-2">
                    <button
                        className="bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={() => setActivePage("Sick Goats")}
                    >
                        Sick Goats
                    </button>

                    <button
                        className="bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={() => setActivePage("Pregnant Goats")}
                    >
                        Pregnant Goats
                    </button>

                    <button
                        className="bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={() => setActivePage("Feed Stock")}
                    >
                        Feed Stock
                    </button>

                    <button
                        className="bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={() => setActivePage("Profit This Month")}
                    >
                        Profit This Month
                    </button>

                    <button
                        className="bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={() => setActivePage("Kids Born This Month")}
                    >
                        Kids Born This Month
                    </button>

                    <button
                        className="bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={() => setActivePage("Goats Ready For Breeding")}
                    >
                        Goats Ready For Breeding
                    </button>

                    <button
                        className="bg-blue-500/80 hover:bg-blue-600 text-white py-2 rounded"
                        onClick={() => setActivePage("Daily Feed Uses")}
                    >
                        Daily Feed Uses
                    </button>

                </div>

            </div>

        </div>
    )
}