import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Courseware from '../../components/Courseware';
import { fetchCourseOutline } from '../../data/actions';

const mapStateToProps = state => ({
  courseOutline: state.courseOutline.outline,
});

const mapDispatchToProps = dispatch => ({
  getCourseOutline: courseId => dispatch(fetchCourseOutline(courseId)),
});

const CoursewarePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Courseware);

export default withCookies(CoursewarePage);
