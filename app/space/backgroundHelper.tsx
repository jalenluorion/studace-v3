let resolvePromiseFunction: (reason: any) => void;

function fetchPromise() {
    const customPromise = new Promise((resolve) => {
        resolvePromiseFunction = resolve;
    }).then((res) => {
        console.log('3')
    });

    return customPromise;
}


async function resolvePromise(reason: string) {
    'use server'
    
    console.log("1")
  if (resolvePromiseFunction) {
    console.log('2')
    resolvePromiseFunction(reason);
  }
}

export {
    fetchPromise,
    resolvePromise
}