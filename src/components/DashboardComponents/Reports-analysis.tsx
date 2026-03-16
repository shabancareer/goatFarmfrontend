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

export default function ReportsAnalysis() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full p-2 cursor-pointer" variant="outline">Reports & Analysis</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-auto">
                    <DropdownMenuGroup className="">
                        <DropdownMenuItem className="child-cursor-pointer">Tag Change</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="child-cursor-pointer">Manage Animal</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Breeding Record</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage weight</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Breed</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Expense type</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Medicine</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Disease</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Farmer</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Customer</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage City</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="child-cursor-pointer">Manage Bank</DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
