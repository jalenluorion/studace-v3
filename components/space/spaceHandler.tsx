import { redirect } from 'next/navigation';

import Space from './spaceMain';

import { defaultSpace } from '@/config/default';
import { fetchBgLoading, fetchUsersLoading } from '@/lib/bgHelper';
import { getSpace } from '@/lib/supabase/space';
import { getAuthUser, getProfile } from '@/lib/supabase/user';
import { fetchModules } from '@/lib/supabase/modules';

export default async function SpaceHandler({
    spaceID,
}: {
    spaceID: string | null;
}) {
    if (!spaceID) {
        const user = await getAuthUser(null)
            .catch(() => {
                return null;
            });
        
        if (user) {
            return redirect('/home');
        } else {
            return (
                <Space
                    spaceUser={null}
                    spaceSettings={defaultSpace}
                    spaceStates={Promise.all([fetchBgLoading(), fetchUsersLoading()])}
                    spaceData={fetchModules(defaultSpace.modules, null)}
                />
            );
        }
    } else {
        const user = await getAuthUser()

        const initialData = await getSpace(spaceID).catch(() => {
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
                spaceStates={Promise.all([fetchBgLoading(), fetchUsersLoading()])}
                spaceData={fetchModules(initialData.modules, spaceID)}
            />
        );
    }
}
