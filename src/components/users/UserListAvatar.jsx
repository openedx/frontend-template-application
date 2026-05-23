/* eslint-disable react/prop-types */
import UserAvatar from './UserAvatar';

const UserListAvatar = (props) => (
  <UserAvatar variant="list" {...props} />
);

export default UserListAvatar;
export { getUserInitials } from '../../utils/userInitials';
