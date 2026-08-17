import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchOrgUsers, changeUserRole, deactivateUser } from '../../../store/thunks/auth/auth.thunks';
import type { RootState, AppDispatch } from '../../../store/store';
import { Role, type User } from '../../../types/shared.types';

export default function ManageEmployeeTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { orgUsers, user: currentUser, status } = useSelector((state: RootState) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('ALL');

    useEffect(() => {
        dispatch(fetchOrgUsers());
    }, [dispatch]);

    const isSuperOwner = Boolean(currentUser?.isSuperOwner || currentUser?.role === Role.SUPER_OWNER);

    if (!isSuperOwner) {
        return (
            <div className="p-8 text-center bg-white rounded-xl shadow-md border border-red-200">
                <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
                <p className="text-sm text-gray-600 mt-2">Only Super Admin / Super Owner can view and manage organization employees.</p>
            </div>
        );
    }

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await dispatch(changeUserRole({ userId, newRole })).unwrap();
            toast.success(`Role updated to ${newRole}`);
        } catch (err: any) {
            toast.error(typeof err === 'string' ? err : 'Failed to update role');
        }
    };

    const handleDeactivate = async (userToDeactivate: User) => {
        if (userToDeactivate.isSuperOwner) {
            toast.error('Super Owner account cannot be deactivated');
            return;
        }
        
        if (confirm(`Are you sure you want to deactivate/remove employee "${userToDeactivate.name}"?`)) {
            try {
                await dispatch(deactivateUser(userToDeactivate.id)).unwrap();
                toast.success('Employee account deactivated and sessions revoked');
            } catch (err: any) {
                toast.error(typeof err === 'string' ? err : 'Failed to deactivate employee');
            }
        }
    };

    // Filter employees by search and role
    const filteredUsers = orgUsers.filter((emp) => {
        const matchesSearch = 
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'ALL' || emp.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="w-full h-full p-4 flex flex-col gap-4 overflow-hidden bg-neutral-50 rounded-xl shadow-sm border border-stone-200">
            {/* Header & Filter Tools */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-xl shadow-xs border border-gray-100 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-emerald-950">Employee Management</h2>
                    <p className="text-xs text-gray-500">Manage all system users, active statuses, and assigned role levels.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-48 bg-gray-50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Role Filter */}
                    <select
                        className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="ALL">All Roles</option>
                        <option value={Role.SUPER_OWNER}>Super Owner</option>
                        <option value={Role.MANAGER}>Manager</option>
                        <option value={Role.WORKER}>Worker</option>
                        <option value={Role.VIEWER}>Viewer</option>
                    </select>

                    <button
                        onClick={() => dispatch(fetchOrgUsers())}
                        className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg transition cursor-pointer"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Employee Table */}
            <div className="flex-1 overflow-auto bg-white rounded-xl shadow-xs border border-gray-200">
                {status === 'loading' && orgUsers.length === 0 ? (
                    <div className="flex items-center justify-center h-48">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                        <p className="text-sm font-semibold">No employees found</p>
                        <p className="text-xs text-gray-400">Try adjusting your search query or filter options.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200 uppercase tracking-wider sticky top-0 z-10">
                                <th className="p-3">Employee</th>
                                <th className="p-3">Email & Verification</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((emp) => (
                                <tr key={emp.id} className="hover:bg-emerald-50/40 transition">
                                    {/* Name & Avatar */}
                                    <td className="p-3 font-medium text-gray-900 flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                            {emp.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-emerald-950">{emp.name}</span>
                                            {emp.isSuperOwner && (
                                                <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 text-amber-800 rounded">
                                                    SUPER OWNER
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="p-3 text-gray-600">
                                        <div>{emp.email}</div>
                                        <span className={`inline-block mt-0.5 px-1.5 py-0.5 text-[9px] rounded font-semibold ${
                                            (emp as any).isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {(emp as any).isEmailVerified ? 'Verified' : 'Pending Verification'}
                                        </span>
                                    </td>

                                    {/* Role Selector */}
                                    <td className="p-3">
                                        {emp.isSuperOwner ? (
                                            <span className="font-bold text-amber-700">Super Owner</span>
                                        ) : (
                                            <select
                                                className="px-2 py-1 border border-gray-300 rounded bg-white font-medium text-gray-700 outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                                                value={emp.role}
                                                onChange={(e) => handleRoleChange(emp.id, e.target.value)}
                                            >
                                                <option value={Role.MANAGER}>Manager</option>
                                                <option value={Role.WORKER}>Worker</option>
                                                <option value={Role.VIEWER}>Viewer</option>
                                            </select>
                                        )}
                                    </td>

                                    {/* Account Active Status */}
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                            emp.isActive 
                                                ? 'bg-emerald-100 text-emerald-800' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {emp.isActive ? 'Active' : 'Deactivated'}
                                        </span>
                                    </td>

                                    {/* Phone */}
                                    <td className="p-3 text-gray-500">
                                        {emp.phone || <span className="italic text-gray-300">Not set</span>}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="p-3 text-right">
                                        {emp.isSuperOwner ? (
                                            <span className="text-[10px] text-gray-400 font-semibold italic">Protected</span>
                                        ) : (
                                            <button
                                                onClick={() => handleDeactivate(emp)}
                                                className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition shadow-2xs ${
                                                    emp.isActive
                                                        ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                disabled={!emp.isActive}
                                            >
                                                {emp.isActive ? 'Deactivate' : 'Disabled'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
