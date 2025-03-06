'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mediaOptions, background } from '@/config/media';
import CategoryPicker from '@/components/ui/categories';

export default function BackgroundPicker({
    categories,
    background,
    setBackground,
}: {
    categories: { value: string; label: string }[];
    background: string;
    setBackground: (background: string) => void;
}) {
    const [category, setCategory] = useState('trending');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Backgrounds</CardTitle>
            </CardHeader>
            <CardContent>
                <CategoryPicker categories={categories} category={category} setCategory={setCategory} className="w-[22.3rem] modmd:w-[34rem] modlg:w-[45.5rem] mb-4"/>
                <div className="inline-grid grid-cols-2 modmd:grid-cols-3 modlg:grid-cols-4 gap-4 w-max max-h-[80vh] overflow-y-auto">
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