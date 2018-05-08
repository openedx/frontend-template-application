import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const CoursewareContent = function CoursewareContent(props) {
  return (
    <div>
      <Helmet>
        <title>Course</title>
      </Helmet>
      <div className="embed-responsive embed-responsive-1by1" key={props.node.id}>
        <iframe src={props.node.displayUrl} title={props.node.displayName} />
      </div>
    </div>
  );
};

CoursewareContent.defaultProps = {
  node: {},
};

CoursewareContent.propTypes = {
  node: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CoursewareContent;
