import React from 'react';
import PropTypes from 'prop-types';

class CoursewareContent extends React.Component {
  componentDidMount() {
    this.props.getSectionBlocks();
  }

  render() {
    return (
      <div>
        {this.props.blockUrls.map((blockUrl, idx) => 
          <div className="embed-responsive embed-responsive-1by1" key={idx}>
            <iframe src={blockUrl} />
          </div>
        )}
      </div>
    );
  }
}

CoursewareContent.defaultProps = {
  blockUrls: [],
  getSectionBlocks: () => {},
};

CoursewareContent.propTypes = {
  blockUrls: PropTypes.array,
  getSectionBlocks: PropTypes.func,
};

export default CoursewareContent;
