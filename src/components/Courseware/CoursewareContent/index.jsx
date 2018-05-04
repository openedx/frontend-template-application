import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const CoursewareContent = ({ blocks }) => (
  <div>
    <Helmet>
      <title>Course</title>
    </Helmet>
    {blocks.map(block =>
    (
      <div className="embed-responsive embed-responsive-1by1" key={block.id}>
        <iframe src={block.url} title={block.displayName} />
      </div>
    ))}
  </div>
);

CoursewareContent.propTypes = {
  blocks: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CoursewareContent;
