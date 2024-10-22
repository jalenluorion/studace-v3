import { getSchool } from "@/lib/supabase/school";

export default async function Home({
    params,
}: {
    params: {
        spaceID: string;
    };
}) {
    const school = await getSchool(params.spaceID);

    return (
        <div className="flex-1 overflow-auto flex flex-col">
            <header className="flex items-center justify-between border-b-2 p-4">
                <h1 className="text-2xl font-bold">{school.name}</h1>
            </header>
            <div className="p-6 flex-1">
            </div>
        </div>
    );
}
