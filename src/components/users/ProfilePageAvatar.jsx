/* eslint-disable react/prop-types */
import UserAvatar from './UserAvatar';

const ProfilePageAvatar = ({ name, imageUrl, children }) => (
  <UserAvatar variant="profile" name={name} imageUrl={imageUrl}>
    {children}
  </UserAvatar>
);

export default ProfilePageAvatar;
