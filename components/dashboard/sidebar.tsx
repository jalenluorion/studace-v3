'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    Flame,
    LayoutGrid,
    LogOut,
    PlusCircle,
    Sparkles,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from '@/lib/supabase/user';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { Tables } from '@/database.types';

export async function AppSidebar({
    profile,
    schools,
}: {
    profile: Tables<'profile'>;
    schools: Tables<'school'>[];
}) {
    const pathname = usePathname();
	
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarGroup>
                    <h1 className="text-xl font-semibold">Studace.Live</h1>
                    <SidebarGroupContent>
                        <Button className="mt-2 w-full" variant="default">
                            <PlusCircle className="mr-2" />
                            Create New Space
                        </Button>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/trending'}>
                                    <a href="/trending">
                                        <Flame />
                                        <span>Trending</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/home'}>
                                    <a href="/home">
                                        <LayoutGrid />
                                        <span>My Spaces</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>My Schools</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{schools.map((school) => (
								<SidebarMenuItem key={school.school_id}>
									<SidebarMenuButton
										asChild
										isActive={pathname === `/school/${school.school_id}`}
									>
										<a href={`/school/${school.school_id}`}>{school.name}</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={profile.avatar || undefined} alt={profile.username} />
                                        <AvatarFallback className="rounded-lg">{(profile.first_name.charAt(0) + profile.last_name.charAt(0)).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {profile.username}
                                        </span>
                                        <span className="text-green-500 truncate text-xs">
                                                Online
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={profile.avatar || undefined}
                                                alt={profile.username}
                                            />
                                            <AvatarFallback className="rounded-lg">{(profile.first_name.charAt(0) + profile.last_name.charAt(0)).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {profile.username}
                                            </span>
                                            <span className="text-green-500 truncate text-xs">
                                                Online
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
