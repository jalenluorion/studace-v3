import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { redirect } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: string, path: string, message: string) {
    return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/**
 * Redirects to a specified path with multiple encoded messages of different types as query parameters.
 * @param {Array<{ type: 'error' | 'success', message: string }>} messages - The array of messages with their types to be encoded and added as query parameters.
 * @param {string} path - The path to redirect to.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirectMultipleTypes(path: string, messages: Array<{ type: string, message: string }>) {
    const queryParams = messages.map(({ type, message }) => `${type}=${encodeURIComponent(message)}`).join('&');
    return redirect(`${path}?${queryParams}`);
}