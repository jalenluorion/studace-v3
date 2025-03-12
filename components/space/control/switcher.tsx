import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tables } from '@/database.types';

export default function SpaceSwitcher({
    recentSpaces,
} : {
    recentSpaces: Tables<'space'>[];
}) {
    const [personal, setPersonal] = useState(true);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Switch Space</CardTitle>
                <CardDescription>Switch between your personal and shared spaces</CardDescription>
            </CardHeader>
            <CardContent>
                <ToggleGroup>
                    <ToggleGroupItem
                        active={personal}
                        onClick={() => setPersonal(true)}
                    >
                        Personal
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        active={!personal}
                        onClick={() => setPersonal(false)}
                    >
                        Shared
                    </ToggleGroupItem>
                </ToggleGroup>
                <div className="grid grid-cols-2 gap-4">
                    {personal ? (
                        <div>Personal</div>
                    ) : (
                        <div>Shared</div>
                    )}
                </div>
            </CardContent>
        </Card>
    );    
}