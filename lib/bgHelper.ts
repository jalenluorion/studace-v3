'use server';

let resolveBgPromiseFunction: (backgroundId: string) => void;
let resolveUsersPromiseFunction: (status: string) => void;

function fetchBgLoading(): Promise<string> {
    const customPromise = new Promise<string>((resolve) => {
        resolveBgPromiseFunction = resolve;
    });

    return customPromise;
}
function fetchUsersLoading(): Promise<string> {
    const customPromise = new Promise<string>((resolve) => {
        resolveUsersPromiseFunction = resolve;
    });

    return customPromise;
}

function setBgLoaded(backgroundId: string) {
    if (resolveBgPromiseFunction) {
        resolveBgPromiseFunction(backgroundId);
    }
}
function setUsersLoaded(status: string) {
    if (resolveUsersPromiseFunction) {
        resolveUsersPromiseFunction(status);
    }
}

export { fetchBgLoading, setBgLoaded, fetchUsersLoading, setUsersLoaded };
