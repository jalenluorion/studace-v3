import { fetchFillerId } from '@/lib/filler';

import { redirect } from 'next/navigation';

import Space from './spaceMain';
import { fetchBgLoading } from '@/lib/spaceBgHelper';

export default async function SpaceHandler({
    guest,
    spaceID,
}: {
    guest: boolean;
    spaceID: string | undefined;
}) {
    const fillerId = await fetchFillerId();

    if (guest == true) {
        if (fillerId) {
            redirect(`/space/${fillerId}`);
        }
    } else {
        if (fillerId !== spaceID) {
            redirect(`/space/${fillerId}`);
        }
    }

    const initialData = {
        backgroundId: 'c0_ejQQcrwI',
    };

    const spaceData = [
        {
            module: 'background',
            data: fetchBgLoading(),
        },
    ];

    return <Space initialData={initialData} spaceData={spaceData} />;
}
