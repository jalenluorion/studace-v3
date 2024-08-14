import { ReactNode } from "react";

export default async function Pager({ promise }: { promise: Promise<any>}) {

    const res = await promise;

    return (
        <h1>{res as ReactNode}</h1>
    )
}