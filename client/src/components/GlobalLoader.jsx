import useNavigationLoader from '../hooks/useNavigationLoader';

/**
 * Drop-in component that activates the global loader on route changes.
 * Place inside <BrowserRouter> (needs useLocation).
 * Renders nothing — purely a side-effect component.
 */
const GlobalLoader = () => {
    useNavigationLoader(700); // 700ms minimum display
    return null;
};

export default GlobalLoader;
