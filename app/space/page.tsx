import Background from './background';
import { Suspense } from 'react';
import Pager from './pager';
import { fetchPromise, resolvePromise } from './backgroundHelper';

export default function SpaceGuest() {
    const customPromise = fetchPromise();
    return(
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <h1>spaceGuest</h1>
                <Pager promise={customPromise} />
            </Suspense>
            <Background videoId='xg1gNlxto2M' resolve={resolvePromise} />
        </main>
    )
}