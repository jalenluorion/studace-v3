import SpaceHandler from '@/components/space/spaceHandler';

export default async function SpaceId(
    props: {
        params: Promise<{
            spaceID: string;
        }>;
    }
) {
    const params = await props.params;
    return <SpaceHandler spaceID={params.spaceID} />;
}
