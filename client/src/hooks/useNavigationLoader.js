import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook that shows the global loader on every route change.
 * Mounts once inside App — listens for pathname changes.
 *
 * Uses a minimum display time so the loader doesn't flash too fast
 * on instant navigations (feels more polished).
 */
const useNavigationLoader = (minDisplayMs = 600) => {
    const location = useLocation();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the very first render (initial page load)
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (window.showLoader) {
            window.showLoader(); // will cycle through messages automatically
        }

        const timer = setTimeout(() => {
            if (window.hideLoader) {
                window.hideLoader();
            }
        }, minDisplayMs);

        return () => clearTimeout(timer);
    }, [location.pathname]); // only trigger on path changes, not query/hash
};

export default useNavigationLoader;
