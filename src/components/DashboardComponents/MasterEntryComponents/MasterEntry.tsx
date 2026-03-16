// import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    // DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import AnimalPanel from "../ManageAnimal/AnimalPanel"
import type { DashboardPages } from "../types/dashboardPages"
type Props = {
    onNavigate: (page: DashboardPages) => void
}

export default function MasterEntry({ onNavigate }: Props) {
    // const [activeComponent, setActiveComponent] = useState<DashboardPages>();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full p-2 cursor-pointer" variant="outline">Master Entry</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-auto">
                    <DropdownMenuGroup className="">
                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Tag Change")}>Tag Change</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Animal")}>
                            Manage Animal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Breeding")}>Manage Breeding Record</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Weight")}>Manage weight</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Breed")}>Manage Breed</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Expense Type")}>Manage Expense type</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Medicine")}>Manage Medicine</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Disease")}>Manage Disease</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Farmer")}>Manage Farmer</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Customer")}>Manage Customer</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage City")}>Manage City</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Manage Bank")}>Manage Bank</DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}
