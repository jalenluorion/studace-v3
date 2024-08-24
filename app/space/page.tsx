import SpaceHandler from "@/components/space/spaceHandler";

export default async function SpaceGuest() {
    return <SpaceHandler guest={true} spaceID={undefined} />;
}
