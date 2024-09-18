import { cn } from '@/lib/utils';

export function Input({ ...props }: React.JSX.IntrinsicElements['input']) {
    return (
        <input
            className={cn('h-8 rounded-md border bg-inherit px-4 py-2 text-sm', props.className)}
            {...props}
        />
    );
}
