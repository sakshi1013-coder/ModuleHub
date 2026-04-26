/**
 * Utility wrapper around fetch() that shows the global loader.
 * Use this for any non-axios calls where you still want the loader.
 *
 * Usage:
 *   const res = await fetchWithLoader('/api/data', { method: 'GET' });
 *   const json = await res.json();
 *
 * @param {string} url - The URL to fetch
 * @param {RequestInit} [options] - Standard fetch options
 * @param {string} [message] - Optional custom loader message
 * @returns {Promise<Response>}
 */
export async function fetchWithLoader(url, options = {}, message) {
    if (window.showLoader) {
        window.showLoader(message || undefined);
    }

    try {
        const response = await fetch(url, options);
        return response;
    } finally {
        if (window.hideLoader) {
            window.hideLoader();
        }
    }
}

export default fetchWithLoader;
