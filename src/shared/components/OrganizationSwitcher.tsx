// import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrganization, type OrganizationInfo } from '../../store/organization/organizationSlice';
import type { RootState, AppDispatch } from '../../store/store';

export default function OrganizationSwitcher() {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { currentOrganization } = useSelector((state: RootState) => state.organization);

    // Mock initial list of farm organisations for the Super Owner (or pulled from user)
    const mockFarms: OrganizationInfo[] = user?.accessibleOrganizations?.map(org => ({
        id: org.id,
        name: org.name,
    })) || [
            { id: user?.orgId || 'org_1', name: 'Main Goat Farm (Primary)' },
            { id: 'org_2', name: 'West Pasture Farm (Branch B)' },
            { id: 'org_3', name: 'Valley Breeding Center' },
        ];

    const activeOrg = currentOrganization || mockFarms[0];

    const handleSelectOrg = (farm: OrganizationInfo) => {
        dispatch(setCurrentOrganization(farm));
    };

    return (
        <div className="w-full bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-2 flex flex-col gap-1">
            <label className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                Active Farm / Organisation
            </label>
            <select
                className="w-full text-xs font-semibold bg-stone-900/80 text-amber-100 border border-amber-500/40 rounded px-2 py-1.5 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                value={activeOrg.id}
                onChange={(e) => {
                    const selected = mockFarms.find(f => f.id === e.target.value);
                    if (selected) handleSelectOrg(selected);
                }}
            >
                {mockFarms.map((farm) => (
                    <option key={farm.id} value={farm.id} className="bg-stone-800 text-white">
                        {farm.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
