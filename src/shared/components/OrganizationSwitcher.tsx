// import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrganization, type OrganizationInfo } from '../../store/organization/organizationSlice';
import type { RootState, AppDispatch } from '../../store/store';

import { useQueryClient } from '@tanstack/react-query';

export default function OrganizationSwitcher() {
    const dispatch = useDispatch<AppDispatch>();
    const queryClient = useQueryClient();
    const { user } = useSelector((state: RootState) => state.auth);
    const { currentOrganization } = useSelector((state: RootState) => state.organization);

    const farms: OrganizationInfo[] = user?.accessibleOrganizations?.map((org: any) => ({
        id: org.id || org._id,
        name: org.name || org.organisationName || 'Main Goat Farm',
    })) || [
        { id: user?.orgId || 'org_1', name: user?.orgName || 'Main Goat Farm (Primary)' }
    ];

    const activeOrg = currentOrganization || farms[0];

    const handleSelectOrg = (farm: OrganizationInfo) => {
        dispatch(setCurrentOrganization(farm));
        queryClient.invalidateQueries({ queryKey: ["goats"] });
    };

    return (
        <div className="w-full bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-2 flex flex-col gap-1">
            <label className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                Active Farm / Organisation
            </label>
            <select
                className="w-full text-xs font-semibold bg-stone-900/80 text-amber-100 border border-amber-500/40 rounded px-2 py-1.5 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                value={activeOrg?.id || ''}
                onChange={(e) => {
                    const selected = farms.find(f => f.id === e.target.value);
                    if (selected) handleSelectOrg(selected);
                }}
            >
                {farms.map((farm) => (
                    <option key={farm.id} value={farm.id} className="bg-stone-800 text-white">
                        {farm.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
