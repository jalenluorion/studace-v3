'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import CategoryPicker from '../ui/categories';
import { mediaOptions, background } from '@/config/media';

export default function DiscoverList({
    categories,
} : {
    categories: { value: string; label: string }[];
}) {
    const [category, setCategory] = useState('trending');

    return (
        <div>
            <CategoryPicker categories={categories} category={category} setCategory={setCategory} className="mb-4"/>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {mediaOptions.backgrounds.map((bg: background) => (
                            <div key={bg.value} className="">
                                <button
                                    className={`w-full h-24 aspect-video rounded-lg bg-cover bg-center border-2`}
                                    style={{ backgroundImage: `url(https://i.ytimg.com/vi/${bg.value}/maxresdefault.jpg)` }}
                                >
                                </button>
                                <div className="text-center text-sm">{bg.label}</div>
                            </div>
                        ))}
            </div>
        </div>
    );
}

export async function SpaceLoader() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-video" />
            ))}
        </div>
    );
}