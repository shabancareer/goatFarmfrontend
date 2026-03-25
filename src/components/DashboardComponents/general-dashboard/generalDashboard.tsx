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
            <div className="relative z-10 w-full">
                <div className="backdrop-blur-md bg-white/10 shadow-xl my-2 p-3 rounded-md flex flex-row justify-around">
                    <div className="grid grid-cols-7 gap-10 ">
                        <SickGoats />
                        <PregnantGoats />
                        <FeedStock />
                        <KidsBornThisMonth />
                        <GoatsReadyForBreeding />
                        <DailyFeedUses />
                        <ProfitThisMonth />
                    </div>
                </div>
                <div className="w-full h-full flex justify-center">
                    <div className="grid grid-cols-3 gap-1 w-full h-screen">

                        <div className="bg-white shadow col-span-2 flex items-center justify-center">
                            Sick Goats
                        </div>
                        <div className=" rounded-xl shadow flex items-center justify-center">
                            <div className="grid grid-col-2 gap-1 w-full h-full">
                                <div className="flex items-center justify-center bg-orange-500">
                                    Feed
                                </div>
                                <div className="flex items-center justify-center bg-green-500">
                                    ffff
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow col-span-2 flex items-center justify-center">
                            Profit
                        </div>



                        <div className="bg-white shadow flex items-center justify-center">
                            Breeding
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}