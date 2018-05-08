import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import CoursewareNav from './CoursewareNav';
import CoursewareContent from './CoursewareContent';

class Courseware extends React.Component {
  componentDidMount() {
    this.props.getCourseOutline(this.props.match.params.courseId);
  }

  renderCourseContent(routeProps) {
    if (this.props) {
      return (
        <CoursewareContent node={routeProps.location.state.node} />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <CoursewareNav courseOutline={this.props.courseOutline} />
          </div>
          <div className="col-9">
            <Route
              path={`${this.props.match.url}/:verticalId`}
              render={routeProps => this.renderCourseContent(routeProps)}
            />
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
  getCourseOutline: () => {},
};

Courseware.propTypes = {
  courseOutline: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getCourseOutline: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      courseId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Courseware;
