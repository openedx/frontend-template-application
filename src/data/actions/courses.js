import {
  FETCH_ENROLLED_COURSES_REQUEST,
  FETCH_ENROLLED_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_FAILURE,
} from '../constants/courses';

import LmsApiService from '../services/LmsApiService';

const fetchEnrolledCoursesRequest = () => ({
  type: FETCH_ENROLLED_COURSES_REQUEST,
});

const fetchEnrolledCoursesSuccess = data => ({
  type: FETCH_ENROLLED_COURSES_SUCCESS,
  payload: {
    data,
  },
});

const fetchEnrolledCoursesFailure = error => ({
  type: FETCH_ENROLLED_COURSES_FAILURE,
  payload: {
    error,
  },
});

const getCourseKeys = courses => courses.map(course => course.course_details.course_id);

const fetchEnrolledCourses = () => (
  (dispatch) => {
    let courses;
    dispatch(fetchEnrolledCoursesRequest());
    return LmsApiService.fetchEnrolledCourses()
      .then((response) => {
        courses = response.data;
        const courseKeys = getCourseKeys(courses);
        return Promise.all(courseKeys.map(LmsApiService.fetchCourseDetails));
      })
      .then((responses) => {
        responses.forEach((response, index) => {
          courses[index] = { ...courses[index], ...response.data };
        });
        const courseKeys = getCourseKeys(courses);
        return Promise.all(courseKeys.map(LmsApiService.fetchCourseBlocks));
      })
      .then((responses) => {
        responses.forEach((response, index) => {
          const {
            blocks,
            root: rootBlock,
          } = response.data;
          const { lms_web_url: linkToCurrentBlock } = blocks[rootBlock];
          courses[index].link_to_current_block = linkToCurrentBlock;
        });
        dispatch(fetchEnrolledCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(fetchEnrolledCoursesFailure(error));
      });
  }
);

export { fetchEnrolledCourses }; // eslint-disable-line import/prefer-default-export
