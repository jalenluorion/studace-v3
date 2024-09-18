'use client';

import { useFormStatus } from 'react-dom';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
    pendingText?: string;
};

export function SubmitButton({ children, pendingText = 'Submitting...', ...props }: Props) {
    const { pending, action } = useFormStatus();

    const isPending = pending && action === props.formAction;

    return (
        <button
            {...props}
            className="flex h-8 items-center justify-center rounded-md bg-black text-sm font-medium text-foreground text-white transition-colors hover:bg-slate-800"
            type="submit"
            aria-disabled={pending}
        >
            {isPending ? pendingText : children}
        </button>
    );
}
