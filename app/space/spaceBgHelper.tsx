let resolvePromiseFunction: (reason: any) => void;

function fetchBgLoading() {
    const customPromise = new Promise((resolve) => {
        resolvePromiseFunction = resolve;
    });

    return customPromise;
}

async function setBgLoaded(reason: string) {
    'use server';

    if (resolvePromiseFunction) {
        resolvePromiseFunction(reason);
    }
}

export { fetchBgLoading, setBgLoaded };
