import { connect } from 'react-redux';
import CoursesPage from '../components/CoursesPage';

const mapStateToProps = state => (
  {
    courses: state.UpdateCourses.courses,
  }
);

const CurrentCoursesPage = connect(
  mapStateToProps,
  null,
)(CoursesPage);

export default CurrentCoursesPage;
