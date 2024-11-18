'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps, forwardRef } from 'react';
import { Button } from '@/components/ui/button';

type Props = ComponentProps<'button'> & {
    pendingText?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
};

// Use forwardRef to make SubmitButton compatible with ref forwarding
export const SubmitButton = forwardRef<HTMLButtonElement, Props>(
    ({ children, pendingText = 'Submitting...', ...props }, ref) => {
        const { pending, action } = useFormStatus();
        const isPending = pending && action === props.formAction;

        return (
            <Button
                {...props}
                ref={ref}
                className="w-full"
                type="submit"
                aria-disabled={pending}
            >
                {isPending ? pendingText : children}
            </Button>
        );
    }
);

SubmitButton.displayName = 'SubmitButton';