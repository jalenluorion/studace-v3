import { createClient } from './server';
import { getSpacesByUser } from './space';

export async function getCategories() {
    const supabase = await createClient();

    const { data, error } = await supabase.from('category').select();

    if (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
    }

    // sort the categories by value alphabetically
    data.sort((a, b) => a.value.localeCompare(b.value));

    // move the trending value to the top
    const trending = data.find((category) => category.value === 'trending');
    if (trending) {
        data.splice(data.indexOf(trending), 1);
        data.unshift(trending);
    }

    return data;
}

export async function getGlobalSettings() {
    const categories = await getCategories();
    const recentSpaces = await getSpacesByUser();

    return {
        categories,
        recentSpaces,
    };
}

export type globalSettings = Awaited<ReturnType<typeof getGlobalSettings>>;