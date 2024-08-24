'use server';

let resolvePromiseFunction: (reason: any) => void;

function fetchBgLoading(): Promise<string> {
    const customPromise = new Promise<string>((resolve) => {
        resolvePromiseFunction = resolve;
    });

    return customPromise;
}

function setBgLoaded(reason: string) {
    if (resolvePromiseFunction) {
        resolvePromiseFunction(reason);
    }
}

export { fetchBgLoading, setBgLoaded };
