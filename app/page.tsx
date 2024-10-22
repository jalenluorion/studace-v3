import AuthButton from '@/components/auth/AuthButton';
import { Suspense } from 'react'

export default async function Home() {

    return (
        <div className="m-2">
            <AuthButton />
            <h1>Spaces</h1>
        </div>
    );
}
