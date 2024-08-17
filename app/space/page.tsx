import { fetchFillerId } from './database/filler';

import { redirect } from 'next/navigation';

import Space from './spaceMain';
import { fetchBgLoading } from './database/spaceBgHelper';

export default async function SpaceGuest() {
    const fillerId = await fetchFillerId();

    if (fillerId) {
        redirect(`/space/${fillerId}`);
    }

    const initialData = {
        backgroundId: "c0_ejQQcrwI"
    };

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
