import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { User, Users, Maximize2, Minimize2, Menu } from 'lucide-react';

const Module = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex-1 rounded-lg border-2 bg-card text-card-foreground shadow-sm flex h-full flex-col w-full sm:w-72 md:w-72 lg:w-72', className)}
            {...props}
        />
    ),
);
Module.displayName = 'Module';

const ModuleHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex items-center gap-1 px-3', className)} {...props} />
    ),
);
ModuleHeader.displayName = 'ModuleHeader';

const ModuleTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={cn('text-lg font-semibold my-1 flex-1', className)} {...props} />
    ),
);
ModuleTitle.displayName = 'ModuleTitle';

const SocialButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, ...props }, ref) => {
        return (
            <Button ref={ref} className={cn("h-auto w-auto p-1", className)} variant="ghost" {...props}>
                <User size={20} />
            </Button>
        );
    },
);
SocialButton.displayName = 'SocialButton';
const ExpandButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, ...props }, ref) => {
        return (
            <Button ref={ref} className={cn("h-auto w-auto p-1", className)} variant="ghost" {...props}>
                <Maximize2 size={20} />
            </Button>
        );
    },
);
ExpandButton.displayName = 'ExpandButton';
const MenuButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, ...props }, ref) => {
        return (
            <Button ref={ref} className={cn("h-auto w-auto p-1", className)} variant="ghost" {...props}>
                <Menu size={20} />
            </Button>
        );
    },
);
MenuButton.displayName = 'MenuButton';

const ModuleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('p-3 pt-0 w-full flex-1', className)} {...props} />
    ),
);
ModuleContent.displayName = 'ModuleContent';

export { Module, ModuleHeader, ModuleTitle, ModuleContent, SocialButton, ExpandButton, MenuButton };
