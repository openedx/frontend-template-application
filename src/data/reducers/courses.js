import moment from 'moment';

import {
  FETCH_ENROLLED_COURSES_REQUEST,
  FETCH_ENROLLED_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSES_FAILURE,
} from '../constants/courses';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const groupCoursesByStatus = (courses) => {
  const now = moment();
  const data = {
    active: courses.filter((course) => {
      const start = moment(course.start);
      if (!course.end) {
        return start <= now;
      }
      return start <= now && moment(course.end) > now;
    }),
    starting: courses.filter(course => moment(course.start) > now),
    closed: courses.filter(course => moment(course.end) <= now),
  };
  return data;
};

const courses = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ENROLLED_COURSES_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case FETCH_ENROLLED_COURSES_SUCCESS:
      return {
        ...initialState,
        data: groupCoursesByStatus(action.payload.data),
      };
    case FETCH_ENROLLED_COURSES_FAILURE:
      return {
        ...initialState,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default courses;
