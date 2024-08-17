'use client'

import { use } from 'react';

export default async function Interface({ promise }: { promise: {module: string, data: Promise<any>}[]}) {
    const modules = promise.map((p) => p.module);
    const data = promise.map((p) => p.data);

    const res = use(Promise.all(data));

    return (
        <div className='w-full h-full absolute z-10'>
            <h1 className='text-white'>spaceGuest</h1>
            {res.map((r, i) => (
                <div className='text-white' key={modules[i]}>{modules[i]}: {r}</div>
            ))}
        </div>
    )
}