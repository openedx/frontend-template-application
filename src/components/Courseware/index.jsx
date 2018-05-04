import React from 'react';
import PropTypes from 'prop-types';

import CoursewareNav from './CoursewareNav';
import CoursewareContent from './CoursewareContent';

class Courseware extends React.Component {
  componentDidMount() {
    this.props.getCourseOutline();
    this.props.getSectionBlocks();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <CoursewareNav courseOutline={this.props.courseOutline} />
          </div>
          <div className="col-9">
            <CoursewareContent blocks={this.props.blocks} />
          </div>
        </div>
      </div>
    );
  }
}

Courseware.defaultProps = {
  courseOutline: {
    displayName: '',
    descendants: [],
  },
  blocks: [],
  getCourseOutline: () => {},
  getSectionBlocks: () => {},
};

Courseware.propTypes = {
  courseOutline: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  blocks: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  getCourseOutline: PropTypes.func,
  getSectionBlocks: PropTypes.func,
};

export default Courseware;
