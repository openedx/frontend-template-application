import { Navigate, useLocation } from 'react-router-dom';
import { adminPath } from '../../utils/adminPaths';

/**
 * Redirects `/admin/...` URLs without a trailing slash to the same path with `/`.
 */
const TrailingSlashRedirect = () => {
  const { pathname, search, hash } = useLocation();

  if (!pathname.startsWith('/admin')) {
    return null;
  }

  if (pathname.endsWith('/')) {
    return null;
  }

  return (
    <Navigate
      to={adminPath(`${pathname}${search}${hash}`)}
      replace
    />
  );
};

export default TrailingSlashRedirect;
