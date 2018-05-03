import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import CoursewareNav from '../../components/Courseware/CoursewareNav';
import { fetchCourseOutline } from '../../data/actions';

const mapStateToProps = state => ({
  courseOutline: state.courseOutline.outline,
});

const mapDispatchToProps = dispatch => ({
  getCourseOutline: () => dispatch(fetchCourseOutline()),
});

const CoursewareNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoursewareNav);

export default withCookies(CoursewareNavContainer);
