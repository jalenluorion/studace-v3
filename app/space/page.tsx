export const dynamic = "force-dynamic";

import SpaceHandler from '@/components/space/spaceHandler';

export default async function SpaceGuest() {
    return <SpaceHandler spaceID={null} />;
}
