import AuthButton from '@/components/auth/AuthButton';
import SpaceList from '@/components/auth/spaceList';
import { Suspense } from 'react'

export default async function Home() {

    return (
        <div className="m-2">
            <AuthButton />
            <h1>Spaces</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <SpaceList />
            </Suspense>
        </div>
    );
}
