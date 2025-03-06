import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function CategoryPicker({
    categories,
    category,
    setCategory,
    className,
}: {
    categories: { value: string; label: string }[];
    category: string;
    setCategory: (category: string) => void;
    className?: string;
}) {
    return (
        <ToggleGroup
            variant="outline"
            type="single"
            value={category}
            onValueChange={(value) => setCategory(value)}
            className={`justify-start [&>*]:min-w-auto overflow-x-scroll ${className}`}
        >
            {categories.map((item) => (
                <ToggleGroupItem key={item.value} value={item.value}>
                    {item.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}