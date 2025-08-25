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
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
    ChevronsUpDown,
    Flame,
    LayoutGrid,
    PlusCircle,
    Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { Tables } from '@/database.types';
import UserMenu from './user-menu';

export function AppSidebar(
    { profile, schools }: { profile: Tables<'profile'>; schools: Tables<'school'>[] }
) {
    const pathname = usePathname();

    return (
        <Sidebar variant="inset" >
            <SidebarHeader>
                <SidebarGroup>
                    <h1 className="text-xl font-semibold">Studace</h1>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className='mb-2'>
                                <Button variant="default" className="w-full">
                                    <PlusCircle className="" />
                                    Create New Space
                                </Button>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/home'}>
                                    <a href="/home">
                                        <LayoutGrid />
                                        <span>My Spaces</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/discover'}>
                                    <a href="/discover">
                                        <Flame />
                                        <span>Discover</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/friends'}>
                                    <a href="/friends">
                                        <Users />
                                        <span>Friends</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {schools.length > 0 && (
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
                )}
            </SidebarContent>
                <SidebarFooter>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={profile.avatar || undefined}
                                        alt={profile.username}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {(
                                            profile.first_name.charAt(0) +
                                            profile.last_name.charAt(0)
                                        ).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {profile.username}
                                    </span>
                                    <span className="truncate text-xs text-green-500">
                                        Online
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <UserMenu profile={profile} />
                    </DropdownMenu>
                </SidebarFooter>
            </Sidebar>
        );
    }