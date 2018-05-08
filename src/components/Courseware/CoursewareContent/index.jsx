import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

class CoursewareContent extends React.Component {
  componentDidMount() {
    this.props.getSectionBlocks(this.props.match.params.sequentialId);
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

CoursewareContent.propTypes = {
  blocks: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  getSectionBlocks: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      sequentialId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(CoursewareContent);
