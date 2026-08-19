import { useEffect } from 'react';
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
        id: String(org.id || org._id),
        name: org.name || org.organisationName,
    })).filter(org => Boolean(org.name)) || [];

    if (farms.length === 0 && user?.orgId) {
        farms.push({
            id: String(user.orgId),
            name: user.orgName || 'Active Farm',
        });
    }

    // Keep currentOrganization updated with official backend organization name if user loaded
    useEffect(() => {
        if (user && farms.length > 0) {
            if (!currentOrganization) {
                dispatch(setCurrentOrganization(farms[0]));
            } else {
                const updatedOrg = farms.find(f => f.id === currentOrganization.id);
                if (updatedOrg && updatedOrg.name !== currentOrganization.name) {
                    dispatch(setCurrentOrganization(updatedOrg));
                }
            }
        }
    }, [user, farms, currentOrganization, dispatch]);

    const activeOrg = (currentOrganization && farms.find(f => f.id === currentOrganization.id))
        || currentOrganization
        || farms[0];

    const handleSelectOrg = (farm: OrganizationInfo) => {
        dispatch(setCurrentOrganization(farm));
        queryClient.invalidateQueries({ queryKey: ["goats"] });
    };

    if (!activeOrg) return null;

    // Combine activeOrg with farms list so the active selection is always present in select dropdown options
    const displayOptions = [...farms];
    if (activeOrg && !displayOptions.some(f => f.id === activeOrg.id)) {
        displayOptions.unshift(activeOrg);
    }

    return (
        <div className="w-full bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-2 flex flex-col gap-1">
            <label className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                Active Farm / Organisation
            </label>
            <select
                className="w-full text-xs font-semibold bg-stone-900/80 text-amber-100 border border-amber-500/40 rounded px-2 py-1.5 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                value={activeOrg?.id || ''}
                onChange={(e) => {
                    const selected = displayOptions.find(f => f.id === e.target.value);
                    if (selected) handleSelectOrg(selected);
                }}
            >
                {displayOptions.map((farm) => (
                    <option key={farm.id} value={farm.id} className="bg-stone-800 text-white">
                        {farm.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
