import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';
import { useGetAllGoats } from "@/hooks/useCreateGoat";

export default function TotalGoats() {
    const { data: goats, isLoading, isError } = useGetAllGoats();
    const totalGoats = goats?.data?.length || 0;
    return (
        isLoading ? (
            <div className="bg-white w-[200px] h-[100px] shadow-md flex items-center justify-center text-center font-semibold text-gray-700 hover:shadow-xl hover:scale-105 transition duration-200 cursor-pointer">
                <h1>Total Goats</h1>
                <p>Loading...</p>
            </div>
        ) : isError ? (
            <div className="bg-white w-[200px] h-[100px] shadow-md flex items-center justify-center text-center font-semibold text-gray-700 hover:shadow-xl hover:scale-105 transition duration-200 cursor-pointer">
                <h1>Total Goats</h1>
                <p>Error</p>
            </div>
        ) : (
            <div className="bg-white w-[200px] h-[100px] shadow-md rounded-2xl flex items-center justify-center text-center font-semibold text-gray-700 hover:shadow-xl hover:scale-105 transition duration-200 cursor-pointer">
                <h1 className="text-2xl">Total Goats <br /> <CrueltyFreeIcon className="text-green-400" />{totalGoats}</h1>
            </div>
        )

    );
}