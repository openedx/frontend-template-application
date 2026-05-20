/* eslint-disable react/prop-types */
import classNames from 'classnames';
import './Skeleton.scss';

/**
 * Base shimmer block. Compose into layout presets or pass custom className/width/height.
 */
const Skeleton = ({
  className = '',
  width,
  height,
  circle = false,
  rounded = 'default',
  style = {},
  as: Tag = 'span',
}) => {
  const mergedStyle = {
    ...style,
    ...(width != null ? { width } : {}),
    ...(height != null ? { height } : {}),
  };

  return (
    <Tag
      className={classNames(
        'skeleton',
        circle && 'skeleton--circle',
        rounded === 'lg' && 'skeleton--rounded-lg',
        rounded === 'md' && 'skeleton--rounded-md',
        className,
      )}
      style={mergedStyle}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
