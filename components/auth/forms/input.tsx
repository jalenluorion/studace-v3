import { cn } from "@/lib/utils";

export function Input({ ...props }: React.JSX.IntrinsicElements["input"]) {
  return (
    <input
      className={cn(
        "rounded-md h-8 text-sm px-4 py-2 bg-inherit border",
        props.className,
      )}
      {...props}
    />
  );
}
