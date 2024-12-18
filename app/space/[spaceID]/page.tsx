import SpaceHandler from '@/components/space/spaceHandler';

export default async function SpaceId({
    params,
}: {
    params: {
        spaceID: string;
    };
}) {
    return <SpaceHandler spaceID={params.spaceID} />;
}
