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
        <div className="relative h-full w-full overflow-hidden mb-10">
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
                <div className="backdrop-blur-md bg-white/10 shadow-xl mb-1 p-2">
                    <div className="grid grid-cols-7 gap-2 ">
                        <SickGoats />
                        <PregnantGoats />
                        <FeedStock />
                        <KidsBornThisMonth />
                        <GoatsReadyForBreeding />
                        <DailyFeedUses />
                        <ProfitThisMonth />
                    </div>
                </div>
                <div className="w-full h-screen flex justify-center">
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="bg-white shadow flex items-center justify-center">
                            Sick Goats
                        </div>
                        <div className="shadow flex items-center justify-center">
                            <div className="grid grid-rows-[80%_20%] gap-1 w-full h-full">
                                <div className="flex flex-col items-center justify-center bg-orange-500">
                                    <div>1</div>
                                </div>
                                <div className="flex flex-row gap-1 items-center justify-center bg-green-500">
                                    <div>1</div>
                                    <div>2</div>
                                </div>
                            </div>
                        </div>

                        <div className=" rounded-xl shadow flex items-center justify-center">
                            <div className="grid grid-rows-[60%_40%] gap-1 w-full h-full">
                                <div className="flex flex-col items-center justify-center bg-orange-500">
                                    <div>1</div>
                                    <div>2</div>
                                    <div>3</div>
                                </div>
                                <div className="flex flex-col items-center justify-center bg-green-500">
                                    <div>1</div>
                                    <div>2</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow flex items-center justify-center">
                            Profit
                        </div>
                        <div className="bg-white shadow flex items-center justify-center">
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