/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getUserInitials } from '../../utils/userInitials';
import { hasDisplayValue } from '../../utils/hasDisplayValue';

const VARIANT_CONFIG = {
  list: {
    wrapperClass: 'users-page__avatar',
    imageClass: 'users-page__avatar-img',
    fallbackClass: null,
  },
  profile: {
    wrapperClass: 'profile-page__avatar',
    imageClass: 'profile-page__avatar-img',
    fallbackClass: 'profile-page__avatar-fallback',
  },
  hero: {
    wrapperClass: 'user-about-page__hero-avatar',
    imageClass: 'user-about-page__hero-avatar-img',
    fallbackClass: null,
  },
  passport: {
    wrapperClass: 'user-passport-page__avatar',
    imageClass: 'user-passport-page__avatar-img',
    fallbackClass: null,
  },
  header: {
    wrapperClass: 'user-profile-menu__avatar admin-top-header__avatar',
    imageClass: null,
    fallbackClass: null,
  },
};

/**
 * @param {{
 *   name?: string,
 *   imageUrl?: string,
 *   variant?: keyof typeof VARIANT_CONFIG,
 *   className?: string,
 *   imageClassName?: string,
 *   fallbackClassName?: string,
 *   children?: React.ReactNode,
 *   imgProps?: object,
 * }} props
 */
const UserAvatar = ({
  name,
  imageUrl,
  variant = 'list',
  className,
  imageClassName,
  fallbackClassName,
  children,
  imgProps = {},
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.list;
  const wrapperClass = className || config.wrapperClass;
  const resolvedImageClass = imageClassName || config.imageClass;
  const resolvedFallbackClass = fallbackClassName || config.fallbackClass;
  const showImage = hasDisplayValue(imageUrl) && !imageFailed;
  const initials = getUserInitials(name);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  const renderFallback = () => {
    if (resolvedFallbackClass) {
      return <div className={resolvedFallbackClass}>{initials}</div>;
    }

    return initials;
  };

  return (
    <div className={wrapperClass} aria-hidden="true">
      {showImage ? (
        <img
          src={imageUrl}
          alt=""
          className={resolvedImageClass || undefined}
          onError={() => setImageFailed(true)}
          {...imgProps}
        />
      ) : (
        renderFallback()
      )}
      {children}
    </div>
  );
};

export default UserAvatar;
