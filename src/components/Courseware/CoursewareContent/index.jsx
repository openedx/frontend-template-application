import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class CoursewareContent extends React.Component {
  componentDidMount() {
    this.props.getSectionBlocks();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Course</title>
        </Helmet>
        {this.props.blockUrls.map((blockUrl, idx) => (
          <div className="embed-responsive embed-responsive-1by1" key={idx}>
            <iframe src={blockUrl} title={idx} scrolling="no" />
          </div>
        ))}
      </div>
    );
  }
}

CoursewareContent.defaultProps = {
  blockUrls: [],
  getSectionBlocks: () => {},
};

CoursewareContent.propTypes = {
  blockUrls: PropTypes.array, // eslint-disable-line
  getSectionBlocks: PropTypes.func,
};

export default CoursewareContent;
