export type Message = { success: string } | { error: string } | { message: string };

export function FormMessage({ message }: { message: Message }) {
    return (
        <div className="flex w-full max-w-md flex-col gap-2 text-sm">
            {'success' in message && (
                <div className="border-l-2 border-green-500 px-4 text-green-500">
                    {message.success}
                </div>
            )}
            {'error' in message && (
                <div className="border-l-2 border-red-500 px-4 text-red-500">{message.error}</div>
            )}
            {'message' in message && (
                <div className="border-l-2 px-4 text-foreground">{message.message}</div>
            )}
        </div>
    );
}