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
        {this.props.blocks.map(block =>
        (
          <div className="embed-responsive embed-responsive-1by1" key={block.id}>
            <iframe src={block.url} title={block.displayName} />
          </div>
        ))}
      </div>
    );
  }
}

CoursewareContent.defaultProps = {
  blocks: [],
  getSectionBlocks: () => {},
};

CoursewareContent.propTypes = {
  blocks: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  getSectionBlocks: PropTypes.func,
};

export default CoursewareContent;
