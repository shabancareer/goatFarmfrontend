import React, { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface Props {
    onNavigate?: (page: string) => void;
}

export default function OrganisationManagement({ onNavigate }: Props) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full p-2 cursor-pointer" variant="outline">
                        Organisation Management
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-auto">
                    <DropdownMenuGroup>
                        <DropdownMenuItem 
                            className="child-cursor-pointer"
                            onClick={() => onNavigate?.("Organisation Management")}
                        >
                            Manage Organisation
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
