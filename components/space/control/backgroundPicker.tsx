import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mediaOptions, background } from '@/config/media';
export default function BackgroundPicker({
    background,
    setBackground,
}: {
    background: string;
    setBackground: (background: string) => void;
}) {
    // TODO: scrollbar overflow

    return (
        <Card>
            <CardHeader>
                <CardTitle>Backgrounds</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="inline-grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-max">
                    {mediaOptions.backgrounds.map((bg: background) => (
                        <div key={bg.value} className="">
                            <button
                                className={`h-24 aspect-video rounded-lg bg-cover bg-center ${
                                    bg.value === background ? 'border-2 border-blue-500' : 'border-2'
                                }`}
                                style={{ backgroundImage: `url(https://i.ytimg.com/vi/${bg.value}/maxresdefault.jpg)` }}
                                onClick={() => setBackground(bg.value)}
                            >
                            </button>
                            <div className="text-center text-sm">{bg.label}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}