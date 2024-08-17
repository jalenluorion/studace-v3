import { fetchFillerId } from '../database/filler';

import { redirect } from 'next/navigation';

import Space from '../spaceMain';
import { fetchBgLoading } from '../database/spaceBgHelper';

export default async function SpaceId({
    params,
}: {
    params: {
        spaceID: string
    }
}) {
    const fillerId = await fetchFillerId();

    if (fillerId !== params.spaceID) {
        redirect(`/space/${fillerId}`);
    }

    const initialData = {
        backgroundId: fillerId as string
    }

    const spaceData = [
        {
            module: 'background',
            data: fetchBgLoading(),
        },
    ];

    return (
        <Space
            initialData={initialData}
            spaceData={spaceData}
        />
    );
}

