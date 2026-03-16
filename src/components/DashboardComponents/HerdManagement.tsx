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
import type { DashboardPages } from "./types/dashboardPages"
type Props = {
    onNavigate: (page: DashboardPages) => void
}

export default function HerdManagement({ onNavigate }: Props) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full p-2 cursor-pointer" variant="outline">Herd Management</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-auto">
                    <DropdownMenuGroup className="">
                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("Herd")}>
                            Herd
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="child-cursor-pointer" onClick={() => onNavigate("HerdManagement")}>
                            Herd Management
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
