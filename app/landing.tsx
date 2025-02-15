'use client';

import Link from 'next/link';
import { mediaOptions, background } from '@/config/media';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Landing() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mediaOptions.backgrounds.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0">
                {mediaOptions.backgrounds.map((bg: background, index: number) => (
                    <Image
                        key={index}
                        src={`https://img.youtube.com/vi/${bg.value}/maxresdefault.jpg`}
                        alt={`Background ${index}`}
                        layout="fill"
                        objectFit="cover"
                        className={`transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
            <div className="relative z-10 text-white flex flex-col items-center justify-center h-full space-y-4 bg-black bg-opacity-50">
                <h1 className="text-4xl font-bold">Studace</h1>
                <p className="text-lg text-center">Your modern personalized space for productivity, collaboration, and learning.</p>
                <div className="flex space-x-4">
                    <Button asChild className='w-36'><Link href="/space">Try a Space!</Link></Button>
                    <Button asChild className='w-36'><Link href="/login">Login/Register</Link></Button>
                </div>
            </div>
        </div>
    );
}
