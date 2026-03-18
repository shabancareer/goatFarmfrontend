import { useState } from "react";
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import { useCreateGoat } from '@/hooks/useCreateGoat';
// import { AnimalInterface } from '@/components/DashboardComponents/MasterEntryComponents/Interfaces/AnimalInterface';
interface FormData {
    animalName: string;
    gender: string;
    purchaseType: string;
    dateOfBirth: string;
    dateOfPurchase: string;
    type: string;
    kiddingCapacity: number | null;
    tagId: string;
    weight: number;
    breedType: string;
    motherId: string;
    fatherId: string;
    partition: string;
    site: string;
    purchasePrice: number;
    purchaseFrom: string;
}

const AddAnimalForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const createGoat = useCreateGoat();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            animalName: '',
            gender: '',
            purchaseType: '',
            dateOfBirth: '',
            dateOfPurchase: '',
            type: '',
            kiddingCapacity: null,
            tagId: '',
            weight: 0,
            breedType: '',
            motherId: '',
            fatherId: '',
            partition: '',
            site: '',
            purchasePrice: 0,
            purchaseFrom: ''
        }
    });

    const gender = watch('gender');
    const purchaseType = watch('purchaseType');
    const onSubmit = async (data: FormData) => {
        try {
            // Transform data for API
            const formattedType = data.type === 'buk' ? 'BUK' : data.type.charAt(0).toUpperCase() + data.type.slice(1);

            const goatData: any = {
                animalName: data.animalName,
                gender: data.gender,
                purchaseType: data.purchaseType === 'purchase' ? 'Purchase' : 'Own',
                type: formattedType,
                tagId: data.tagId,
                weight: Number(data.weight) || 0,
                breedType: data.breedType,
                motherId: Number(data.motherId) || 0,
                fatherId: Number(data.fatherId) || 0,
                partition: data.partition,
                site: data.site,
                purchasePrice: Number(data.purchasePrice) || 0,
                purchaseFram: data.purchaseFrom,
            };

            if (data.dateOfBirth) goatData.dateOfBirth = data.dateOfBirth;
            if (data.dateOfPurchase) goatData.purchaseDate = data.dateOfPurchase;
            if (data.kiddingCapacity) goatData.kiddingCapacity = Number(data.kiddingCapacity);

            await createGoat.mutateAsync(goatData);
            reset(); // Reset form on success
            alert('✅ Goat added successfully!');

        } catch (error) {
            console.error('Failed to add goat:', error);
        }
    };

    return (

        <div className="manage-animal-bg w-full h-full">
            <div className="p-4 flex flex-col items-center">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl my-2 font-bold">Manage Animal</h2>
                    <Separator />
                </div>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 mx-3 rounded">Add Animal</button>
            {showModal && (<form onSubmit={handleSubmit(onSubmit)} className="p-10 absolute w-full rounded-lg shadow">

                {createGoat.isError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        Error: {createGoat.error?.response?.data?.message || 'Failed to add goat'}
                    </div>
                )}
                <div className="grid grid-cols-2 gap-2 border border-2 w-1/2 rounded-lg mx-auto bg-white shadow-lg p-8">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute right-150 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-md"
                    >
                        <X />
                    </button>
                    {/* Animal Name */}
                    <div className="flex flex-col justify-center p-3">
                        <label htmlFor="animalName" className="font-medium">Animal Name *</label>
                        <input
                            id="animalName"
                            type="text"
                            {...register('animalName', { required: 'Animal name is required' })}
                            className={`border ${errors.animalName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Barhy Seeng Wali etc."
                        />
                        {errors.animalName && (
                            <span className="text-red-500 text-xs mt-1">{errors.animalName.message}</span>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="gender" className="font-medium">Gender *</label>
                        <select
                            id="gender"
                            {...register('gender', { required: 'Gender is required' })}
                            className={`border ${errors.gender ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Kid">Kid</option>
                        </select>
                        {errors.gender && (
                            <span className="text-red-500 text-xs mt-1">{errors.gender.message}</span>
                        )}
                    </div>

                    {/* Purchase Type */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="purchaseType" className="font-medium">Purchase Type *</label>
                        <select
                            id="purchaseType"
                            {...register('purchaseType', { required: 'Purchase type is required' })}
                            className={`border ${errors.purchaseType ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                        >
                            <option value="">Select Purchase Type</option>
                            <option value="purchase">Purchase</option>
                            <option value="own">Own</option>
                        </select>
                        {errors.purchaseType && (
                            <span className="text-red-500 text-xs mt-1">{errors.purchaseType.message}</span>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="dateOfBirth" className="font-medium">Date of Birth *</label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            {...register('dateOfBirth', {
                                required: purchaseType === 'own' ? 'Date of birth is required' : false
                            })}
                            disabled={purchaseType === "purchase"}
                            className={`border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 disabled:bg-gray-200`}
                        />
                        {errors.dateOfBirth && (
                            <span className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</span>
                        )}
                    </div>

                    {/* Date of Purchase */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="dateOfPurchase" className="font-medium">Date of Purchase *</label>
                        <input
                            id="dateOfPurchase"
                            type="date"
                            {...register('dateOfPurchase', {
                                required: purchaseType === 'purchase' ? 'Purchase date is required' : false
                            })}
                            disabled={purchaseType === "own"}
                            className={`border ${errors.dateOfPurchase ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 disabled:bg-gray-200`}
                        />
                        {errors.dateOfPurchase && (
                            <span className="text-red-500 text-xs mt-1">{errors.dateOfPurchase.message}</span>
                        )}
                    </div>

                    {/* Type */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="type" className="font-medium">Type *</label>
                        <select
                            id="type"
                            {...register('type', { required: 'Type is required' })}
                            className={`border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                        >
                            <option value="">Select type</option>
                            <option value="buk">Buk</option>
                            <option value="weather">Weather</option>
                            <option value="doe">Doe</option>
                        </select>
                        {errors.type && (
                            <span className="text-red-500 text-xs mt-1">{errors.type.message}</span>
                        )}
                    </div>

                    {/* Kidding Capacity */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="kiddingCapacity" className="font-medium">Kidding Capacity</label>
                        <select
                            id="kiddingCapacity"
                            {...register('kiddingCapacity', {
                                required: gender === 'Female' ? 'Kidding capacity is required for females' : false
                            })}
                            disabled={gender !== "Female"}
                            className={`border ${errors.kiddingCapacity ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 disabled:bg-gray-200`}
                        >
                            <option value="">Select Kidding Capacity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {errors.kiddingCapacity && (
                            <span className="text-red-500 text-xs mt-1">{errors.kiddingCapacity.message}</span>
                        )}
                    </div>

                    {/* Tag ID */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="tagId" className="font-medium">Tag ID *</label>
                        <input
                            id="tagId"
                            type="text"
                            {...register('tagId', { required: 'Tag ID is required' })}
                            className={`border ${errors.tagId ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Tag ID"
                        />
                        {errors.tagId && (
                            <span className="text-red-500 text-xs mt-1">{errors.tagId.message}</span>
                        )}
                    </div>

                    {/* Weight */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="weight" className="font-medium">Weight KG *</label>
                        <input
                            id="weight"
                            type="number"
                            step="0.1"
                            {...register('weight', {
                                required: 'Weight is required',
                                min: { value: 0.1, message: 'Weight must be greater than 0' }
                            })}
                            className={`border ${errors.weight ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Weight KG"
                        />
                        {errors.weight && (
                            <span className="text-red-500 text-xs mt-1">{errors.weight.message}</span>
                        )}
                    </div>

                    {/* Breed Type */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="breedType" className="font-medium">Breed Type *</label>
                        <select
                            id="breedType"
                            {...register('breedType', { required: 'Breed type is required' })}
                            className={`border ${errors.breedType ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                        >
                            <option value="">Select Breed Type</option>
                            <option value="Beetal">Beetal</option>
                            <option value="Teddy">Teddy</option>
                            <option value="Nachi">Nachi</option>
                            <option value="Dera Din Panah (DDP)">Dera Din Panah (DDP)</option>
                            <option value="Barbari">Barbari</option>
                            <option value="Pothwari/Potohari">Pothwari/Potohari</option>
                            <option value="Hairy/Kajli">Hairy/Kajli</option>
                        </select>
                        {errors.breedType && (
                            <span className="text-red-500 text-xs mt-1">{errors.breedType.message}</span>
                        )}
                    </div>

                    {/* Mother ID */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="motherId">Mother ID</label>
                        <input
                            id="motherId"
                            type="number"
                            {...register('motherId')}
                            disabled={purchaseType === "purchase"}
                            className="border border-gray-300 rounded-md p-2 disabled:bg-gray-200"
                            placeholder="Mother ID"
                        />
                    </div>

                    {/* Father ID */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="fatherId">Father ID</label>
                        <input
                            id="fatherId"
                            type="number"
                            {...register('fatherId')}
                            disabled={purchaseType === "purchase"}
                            className="border border-gray-300 rounded-md p-2 disabled:bg-gray-200"
                            placeholder="Father ID"
                        />
                    </div>

                    {/* Partition */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="partition">Partition</label>
                        <input
                            id="partition"
                            type="text"
                            {...register('partition')}
                            className="border border-gray-300 rounded-md p-2"
                            placeholder="Partition"
                        />
                    </div>

                    {/* Site */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="site">Site</label>
                        <input
                            id="site"
                            type="text"
                            {...register('site')}
                            className="border border-gray-300 rounded-md p-2"
                            placeholder="Site"
                        />
                    </div>

                    {/* Purchase Price */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="purchasePrice" className="font-medium">Purchase Price</label>
                        <input
                            id="purchasePrice"
                            type="number"
                            {...register('purchasePrice', {
                                required: purchaseType === 'purchase' ? 'Purchase price is required' : false,
                                min: { value: 0, message: 'Price cannot be negative' }
                            })}
                            disabled={purchaseType === "own"}
                            className={`border ${errors.purchasePrice ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 disabled:bg-gray-200`}
                            placeholder="Purchase Price"
                        />
                        {errors.purchasePrice && (
                            <span className="text-red-500 text-xs mt-1">{errors.purchasePrice.message}</span>
                        )}
                    </div>

                    {/* Purchase From */}
                    <div className="flex flex-col justify-center p-1">
                        <label htmlFor="purchaseFrom" className="font-medium">Purchase From</label>
                        <input
                            id="purchaseFrom"
                            type="text"
                            {...register('purchaseFrom', {
                                required: purchaseType === 'purchase' ? 'Seller name is required' : false
                            })}
                            disabled={purchaseType === "own"}
                            className={`border ${errors.purchaseFrom ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 disabled:bg-gray-200`}
                            placeholder="Purchase From"
                        />
                        {errors.purchaseFrom && (
                            <span className="text-red-500 text-xs mt-1">{errors.purchaseFrom.message}</span>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={createGoat.isPending || isSubmitting}
                        className={`mt-4 bg-blue-500 relative left-1/2 mx-auto w-1/2 hover:bg-blue-600 cursor-pointer text-white p-3 rounded-md font-medium ${createGoat.isPending ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {createGoat.isPending ? 'Saving...' : 'Save'}
                    </button>
                </div>

            </form>
            )}
            <div className="mx-2 mt-4 bg-white w-full">
                <div className="flex flex-row gap-3 m-2 rounded-md p-8 w-1/4">
                    <div className="">
                        <label className="text-xl font-bold" htmlFor="startDate">Start Date:</label>
                        <input className="border border-gray-300 hover:border-gray-500 rounded-md p-10" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-xl font-bold" htmlFor="endDate">End Date:</label>
                        <input className="border border-gray-300 hover:border-gray-500 rounded-md p-10" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    {/* <button onClick={() => fetchAnimals()}>Filter</button> */}
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl my-2 font-bold">Animal List</h2>
                </div>
                <Separator />
                <table className="w-full border border-gray-300 border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 p-2">Sr#</th>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Tag ID</th>
                            <th className="border border-gray-300 p-2">Gender</th>
                            <th className="border border-gray-300 p-2">Initial Weight</th>
                            <th className="border border-gray-300 p-2">Current Weight</th>
                            <th className="border border-gray-300 p-2">DOB</th>
                            <th className="border border-gray-300 p-2">Kidding Capacity</th>
                            <th className="border border-gray-300 p-2">Animal Type</th>
                            <th className="border border-gray-300 p-2">Animal Name</th>
                            <th className="border border-gray-300 p-2">Age Calculator</th>
                            <th className="border border-gray-300 p-2">Mother ID</th>
                            <th className="border border-gray-300 p-2">Father ID</th>
                            <th className="border border-gray-300 p-2">Partition</th>
                            <th className="border border-gray-300 p-2">Site</th>
                            <th className="border border-gray-300 p-2">Purchase Type</th>
                            <th className="border border-gray-300 p-2">Purchase Date</th>
                            <th className="border border-gray-300 p-2">Purchase Price</th>
                            <th className="border border-gray-300 p-2">Purchase From</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                        <tr>
                            <td>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                                    Edit
                                </button>

                                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        {/* rows will come here */}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default AddAnimalForm;