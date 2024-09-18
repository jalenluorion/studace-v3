'use client';

import { Module, ModuleHeader, ModuleTitle, ModuleContent, SocialButton, ExpandButton, MenuButton } from '@/components/ui/module-card';
import { Badge } from '../ui/badge';
export default function Timer() {
    return (
        <Module>
            <ModuleHeader>
                <ModuleTitle>Timer</ModuleTitle>
                <div className="flex gap-1">
                    <SocialButton />
                    <ExpandButton />
                    <MenuButton />
                </div>
            </ModuleHeader>
            <ModuleContent className='flex flex-col items-center'>
                <div className='w-full flex-1 font-semibold text-4xl text-center'>23:42</div>
                <Badge>Focus Session</Badge>
            </ModuleContent>
        </Module>
    );
};