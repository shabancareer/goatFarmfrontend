// import { useState, type JSX } from "react";
// import type { GeneralDashboardPages } from "../types/GeneralDashboard";
import v1 from "../../../assets/goatvideos/generalDashboard.mp4";
import SickGoats from "./SickGoats";
import PregnantGoats from "./PregnantGoats";
import FeedStock from "./FeedStock";
import ProfitThisMonth from "./ProfitThisMonth";
import KidsBornThisMonth from "./KidsBornThisMonth";
import GoatsReadyForBreeding from "./GoatsReadyForBreeding";
import DailyFeedUses from "./DailyFeedUses";
import type { DashboardPages } from "../types/dashboardPages";
import TotalGoats from "./TotalSize";

type Props = {
    onNavigate?: (page: DashboardPages) => void;
};

export default function GeneralDashboard({ onNavigate }: Props) {
    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col">
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

            {/* CONTENT CONTAINER - FULL SCREEN FIT */}
            <div className="relative z-10 w-full h-full flex flex-col p-2 gap-2 overflow-hidden">
                {/* TOP STATS BAR */}
                <div className="backdrop-blur-md bg-white/10 shadow-xl rounded-xl p-2 shrink-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        <TotalGoats onNavigate={onNavigate} />
                        <PregnantGoats />
                        <GoatsReadyForBreeding />
                        <KidsBornThisMonth />
                        <FeedStock />
                        <DailyFeedUses />
                    </div>
                </div>

                {/* BOTTOM DASHBOARD GRID */}
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-2 min-h-0">
                    <div className="bg-white/95 backdrop-blur shadow-md rounded-xl p-2 flex items-center justify-center overflow-hidden">
                        <SickGoats />
                    </div>

                    <div className="shadow-md rounded-xl overflow-hidden flex flex-col gap-1">
                        <div className="flex-1 bg-orange-500/90 backdrop-blur rounded-t-xl flex items-center justify-center p-2 overflow-hidden">
                            <ProfitThisMonth />
                        </div>
                        <div className="h-12 bg-green-600/90 backdrop-blur rounded-b-xl flex flex-row gap-4 items-center justify-center text-white font-bold">
                            <div>1</div>
                            <div>2</div>
                        </div>
                    </div>

                    <div className="shadow-md rounded-xl overflow-hidden flex flex-col gap-1">
                        <div className="flex-1 bg-orange-500/90 backdrop-blur rounded-t-xl flex flex-col items-center justify-center text-white font-bold gap-1">
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                        </div>
                        <div className="h-16 bg-green-600/90 backdrop-blur rounded-b-xl flex flex-col items-center justify-center text-white font-bold">
                            <div>1</div>
                            <div>2</div>
                        </div>
                    </div>

                    <div className="bg-white/95 backdrop-blur shadow-md rounded-xl p-2 flex items-center justify-center font-bold text-gray-700">
                        Profit
                    </div>
                    <div className="bg-white/95 backdrop-blur shadow-md rounded-xl p-2 flex items-center justify-center font-bold text-gray-700">
                        Profit
                    </div>
                    <div className="bg-white/95 backdrop-blur shadow-md rounded-xl p-2 flex items-center justify-center font-bold text-gray-700">
                        Breeding
                    </div>
                </div>
            </div>
        </div>
    )
}