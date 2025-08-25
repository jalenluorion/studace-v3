export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

import Space from '@/components/space/spaceMain';

import { fetchBgLoading, fetchUsersLoading } from '@/lib/bgHelper';
import { getSpace } from '@/lib/supabase/space';
import { getAuthUser, getProfile } from '@/lib/supabase/user';
import { fetchModules } from '@/lib/supabase/modules';
import { getGlobalSettings } from '@/lib/supabase/globals';

export default async function SpaceId(props: {
    params: Promise<{
        spaceID: string;
    }>;
}) {
    const params = await props.params;
    const user = await getAuthUser();
    const globalSettings = await getGlobalSettings();

    const initialData = await getSpace(params.spaceID).catch(() => {
        return redirect('/home');
    });

    // Check if the user ID is in the space ID owners
    if (
        (initialData.owner_id !== user.id && initialData.allowed_users == null) ||
        (initialData.owner_id !== user.id &&
            initialData.allowed_users !== null &&
            !initialData.allowed_users.includes(user.id))
    ) {
        // TODO: locked spaces
        return redirect('/home');
    }

    const spaceUser = await getProfile(user.id);

    return (
        <Space
            spaceUser={spaceUser}
            spaceSettings={initialData}
            spaceStates={Promise.all([fetchUsersLoading(), fetchBgLoading()])}
            modules={fetchModules(initialData.modules, params.spaceID)}
            spaceGlobals={globalSettings}
        />
    );
}
