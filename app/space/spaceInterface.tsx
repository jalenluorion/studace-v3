import { ReactNode } from "react";

export default async function Interface({ promise }: { promise: Promise<any>}) {

    const res = await promise;

    return (
        <div className='w-full h-full absolute z-10'>
            <h1 className='text-white'>spaceGuest</h1>
            <h1>{res as ReactNode}</h1>
        </div>
    )
}