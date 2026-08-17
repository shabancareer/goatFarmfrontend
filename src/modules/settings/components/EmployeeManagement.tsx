import { useState } from 'react';
import { Button } from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import AddEmployeeModal from './AddEmployeeModal';

interface Props {
    onNavigate?: (page: string) => void;
}

export default function EmployeManagment({ onNavigate }: Props) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full p-2 cursor-pointer" variant="outline">Employee Management</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-auto">
                    <DropdownMenuGroup className="">
                        <DropdownMenuItem 
                            className="child-cursor-pointer"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add Employee
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="child-cursor-pointer"
                            onClick={() => onNavigate?.("Employe Managment")}
                        >
                            Manage Employee
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Modal for adding a new employee */}
            <AddEmployeeModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </div>
    )
}