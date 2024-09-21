import { redirect } from 'next/navigation';

import Space from './spaceMain';

import { defaultSpace } from '@/config/default';
import { fetchBgLoading, fetchUsersLoading } from '@/lib/bgHelper';
import { getSpace } from '@/lib/supabase/space';
import { getLastSpace, updateLastSpace } from '@/lib/supabase/user';
import { fetchModules } from '@/lib/supabase/modules';

import { createClient } from '@/lib/supabase/server';

export default async function SpaceHandler({
    guest,
    spaceID,
}: {
    guest: boolean;
    spaceID: string | undefined;
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (guest) {
        if (user) {
            const lastSpace = await getLastSpace(user.id);
            return redirect(lastSpace ? 'space/' + lastSpace : '/');
        }

        return (
            <Space
                spaceSettings={defaultSpace}
                spaceStates={[fetchBgLoading(), fetchUsersLoading()]}
                spaceData={fetchModules(defaultSpace.modules, null)}
            />
        );
    } else {
        if (!user) {
            return redirect('/login');
        }

        if (!spaceID) {
            throw new Error('This should never happen.');
        }

        const lastSpace = await getLastSpace(user.id);

        const initialData = await getSpace(spaceID).catch(() => {
            return redirect(lastSpace ? 'space/' + lastSpace : '/');
        });

        // Check if the user ID is in the space ID owners
        if (
            (initialData.owner_id !== user.id && initialData.allowed_users == null) ||
            (initialData.owner_id !== user.id &&
                initialData.allowed_users !== null &&
                !initialData.allowed_users.includes(user.id))
        ) {
            return redirect(lastSpace ? 'space/' + lastSpace : '/');
        }

        await updateLastSpace(user.id, spaceID);

        return (
            <Space
                spaceSettings={initialData}
                spaceStates={[fetchBgLoading(), fetchUsersLoading()]}
                spaceData={fetchModules(initialData.modules, spaceID)}
            />
        );
    }
}
