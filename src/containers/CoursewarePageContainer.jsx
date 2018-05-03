import { connect } from 'react-redux';
import CoursewarePage from '../components/CoursewarePage';
import { fetchCourseOutline } from '../data/actions';
import { withCookies, Cookies } from 'react-cookie';

const mapStateToProps = state => (
    {
      courseOutline: state.courseOutline.outline,
    }
  );
  
  const mapDispatchToProps = dispatch => (
    {
      getCourseOutline: () => dispatch(fetchCourseOutline()),
    }
  );
  
  const CoursewarePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CoursewarePage);
  
  export default withCookies(CoursewarePageContainer);
  