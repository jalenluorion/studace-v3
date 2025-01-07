export interface background {
    value: string;
    label: string;
    live: boolean;
}
export interface audio {
    value: string;
    label: string;
}

export const mediaOptions: {
    backgrounds: background[];
    audio: audio[];
} = {
    backgrounds: [
        { value: 'c0_ejQQcrwI', label: 'Coffee Shop', live: false },
        { value: '-VgN7nKx9MU', label: 'Fireplace', live: false },
        { value: 'xg1gNlxto2M', label: 'New York City', live: false },
        { value: 'CHFif_y2TyM', label: 'Library', live: false },
        { value: 'mkgylOJSdhE', label: 'Backyard Rain', live: false },
        { value: 'acsLxmnjMho', label: 'Treehouse', live: false },
        { value: 'QX9ptr60JFw', label: 'Rainy Woods', live: false },
        { value: 'jfKfPfyJRdk', label: 'Lofi Hip Hop', live: true },
    ],
    audio: [
        { value: 'yIQd2Ya0Ziw', label: 'Rain' },
        { value: 'qsOUv9EzKsg', label: 'Fireplace' },
        { value: 'jfKfPfyJRdk', label: 'Lo-fi' },
        { value: 'WPni755-Krg', label: 'Ambience' },
        { value: 'BMuknRb7woc', label: 'Classical' },
        { value: '3NycM9lYdRI', label: 'Piano' },
        { value: 'Y-JQ-RCyPpQ', label: 'Jazz' },
        { value: 'LVbUNRwpXzw', label: 'Techno' },
    ],
};