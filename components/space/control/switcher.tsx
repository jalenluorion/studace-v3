import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tables } from '@/database.types';

export default function SpaceSwitcher({
    recentSpaces,
} : {
    recentSpaces: Tables<'space'>[];
}) {
    type optionType = 'My Spaces' | 'Shared' | 'School';
    const [option, setOption] = useState<optionType>('My Spaces');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Switch Space</CardTitle>
            </CardHeader>
            <CardContent>
                <ToggleGroup
                    variant="outline"
                    type="single"
                    value={option}
                    onValueChange={(value) => setOption(value as optionType)}
                >
                    <ToggleGroupItem
                        value='My Spaces'
                        onClick={() => setOption('My Spaces')}
                    >
                        My Spaces
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='Shared'
                        onClick={() => setOption('Shared')}
                    >
                        Shared
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='School'
                        onClick={() => setOption('School')}
                    >
                        School
                    </ToggleGroupItem>
                </ToggleGroup>
                <div className="inline-grid grid-cols-2 modmd:grid-cols-3 modlg:grid-cols-4 gap-4 w-max max-h-[50vh] overflow-y-auto">
                                    {recentSpaces.map((space) => (
                                        <div key={space.background} className="">
                                            {/* <button
                                                className={`h-24 aspect-video rounded-lg bg-cover bg-center ${
                                                    bg.value === background ? 'border-2 border-blue-500' : 'border-2'
                                                }`}
                                                style={{ backgroundImage: `url(https://i.ytimg.com/vi/${bg.value}/maxresdefault.jpg)` }}
                                                onClick={() => setBackground(bg.value)}
                                            >
                                            </button> */}
                                            {/* <div className="text-center text-sm">{bg.label}</div> */}
                                        </div>
                                    ))}
                                </div>
            </CardContent>
        </Card>
    );    
}