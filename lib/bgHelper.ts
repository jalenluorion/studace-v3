'use server';

let resolvePromiseFunction: (backgroundId: string) => void;

function fetchBgLoading(): Promise<string> {
    const customPromise = new Promise<string>((resolve) => {
        resolvePromiseFunction = resolve;
    });

    return customPromise;
}

function setBgLoaded(backgroundId: string) {
    if (resolvePromiseFunction) {
        resolvePromiseFunction(backgroundId);
    }
}

export { fetchBgLoading, setBgLoaded };
