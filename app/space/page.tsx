export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

import Space from '@/components/space/spaceMain';

import { defaultSpace } from '@/config/default';
import { fetchBgLoading, fetchUsersLoading } from '@/lib/bgHelper';
import { getSpace } from '@/lib/supabase/space';
import { getAuthUser, getProfile } from '@/lib/supabase/user';
import { fetchModules } from '@/lib/supabase/modules';
import { getGlobalSettings } from '@/lib/supabase/globals';

export default async function SpaceGuest() {
    const globalSettings = await getGlobalSettings();
    const user = await getAuthUser(null).catch(() => {
        return null;
    });

    if (user) {
        return redirect('/home');
    } else {
        return (
            <Space
                spaceUser={null}
                spaceSettings={defaultSpace}
                spaceStates={Promise.all([fetchUsersLoading(), fetchBgLoading()])}
                modules={fetchModules(defaultSpace.modules, null)}
                spaceGlobals={globalSettings}
            />
        );
    }
}
