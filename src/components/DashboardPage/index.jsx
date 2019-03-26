import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Icon, StatusAlert } from '@edx/paragon';

import CourseCard from '../CourseCard';
import CourseStatusTabs from '../CourseStatusTabs';
import ExploreCourses from '../ExploreCourses';

import './DashboardPage.scss';

class DashboardPage extends React.Component {
  componentDidMount() {
    const { username } = this.props;
    if (username) {
      this.props.fetchUserAccount(username);
      this.props.fetchEnrolledCourses();
    }
  }

  getEnrolledCourses(courseStatus) {
    const { enrolledCourses } = this.props;
    if (enrolledCourses && courseStatus in enrolledCourses) {
      return enrolledCourses[courseStatus];
    }
    return [];
  }

  hasEnrolledCourses() {
    const { match: { params: { courseStatus } } } = this.props;
    const courses = this.getEnrolledCourses(courseStatus);
    return courses && courses.length > 0;
  }

  renderEnrolledCourses() {
    const { match: { params: { courseStatus } } } = this.props;
    const courses = this.getEnrolledCourses(courseStatus);
    return courses.map(course => (
      <div className="col-4 mb-3" key={course.course_id}>
        <CourseCard data={course} />
      </div>
    ));
  }

  renderNoEnrolledCourses() {
    return (
      <StatusAlert
        dialog={
          <React.Fragment>
            <Icon className={['fa', 'fa-exclamation-circle', 'mr-2']} />
            There are no courses to show.
          </React.Fragment>
        }
        dismissible={false}
        open
      />
    );
  }

  renderLoadingMessage() {
    return (
      <StatusAlert
        alertType="info"
        dialog={
          <React.Fragment>
            <Icon className={['fa', 'fa-spinner', 'fa-spin', 'mr-2']} />
            Loading...
          </React.Fragment>
        }
        dismissible={false}
        open
      />
    );
  }

  render() {
    const {
      error,
      loading,
      match: {
        params: { courseStatus },
      },
    } = this.props;

    if (!courseStatus) {
      return <Redirect to="/dashboard/active" />;
    }

    return (
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-9">
          <h1 className="mb-3">My Courses</h1>
          {loading && this.renderLoadingMessage()}
          {!loading && (
            <React.Fragment>
              {error && this.renderErrorMessage()}
              <CourseStatusTabs
                status={courseStatus}
                tabs={[
                  {
                    label: 'Active',
                    slug: 'active',
                    count: this.getEnrolledCourses('active').length,
                  },
                  {
                    label: 'Starting Soon',
                    slug: 'starting',
                    count: this.getEnrolledCourses('starting').length,
                  },
                  {
                    label: 'Closed',
                    slug: 'closed',
                    count: this.getEnrolledCourses('closed').length,
                  },
                ]}
              />
              {this.hasEnrolledCourses() && (
                <div className="row equal-col-height">
                  {this.renderEnrolledCourses()}
                </div>
              )}
              {!this.hasEnrolledCourses() && this.renderNoEnrolledCourses()}
            </React.Fragment>
          )}
        </div>
        <div className="col-sm-12 col-md-4 col-lg-3">
          <ExploreCourses />
        </div>
      </div>
    );
  }
}

DashboardPage.defaultProps = {
  username: null,
  enrolledCourses: null,
  loading: false,
  error: null,
};

DashboardPage.propTypes = {
  fetchUserAccount: PropTypes.func.isRequired,
  fetchEnrolledCourses: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      courseStatus: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  username: PropTypes.string,
  enrolledCourses: PropTypes.shape({
    active: PropTypes.arrayOf(PropTypes.shape({})),
    starting: PropTypes.arrayOf(PropTypes.shape({})),
    completed: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default withRouter(DashboardPage);
