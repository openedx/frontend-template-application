import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Courseware from '../../components/Courseware';
import { fetchCourseOutline, fetchSectionBlocks } from '../../data/actions';

const mapStateToProps = state => ({
  courseOutline: state.courseOutline.outline,
  blocks: state.sectionBlocks.blocks,
});

const mapDispatchToProps = dispatch => ({
  getCourseOutline: courseId => dispatch(fetchCourseOutline(courseId)),
  getSectionBlocks: sectionId => dispatch(fetchSectionBlocks(sectionId)),
});

const CoursewarePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Courseware);

export default withCookies(CoursewarePage);
