import SpaceList, { SpaceLoader } from "@/components/dashboard/spaces";
import { Suspense } from "react";

export default async function Home() {
    return (
        <div className="flex-1 overflow-auto flex flex-col">
            <header className="flex items-center justify-between border-b-2 p-4">
                <h1 className="text-2xl font-bold">Digital Spaces</h1>
            </header>
            <div className="p-6 flex-1">
              <Suspense fallback={<SpaceLoader />}>
                < SpaceList />
              </Suspense>
            </div>
        </div>
    );
}
