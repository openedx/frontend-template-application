import { UPDATE_COURSES } from '../constants/ActionType';

const UpdateCourses = (state = { courses: [] }, action) => {
  switch (action.type) {
    case UPDATE_COURSES:
      return {
        courses: action.courses,
      };
    default:
      return state;
  }
};

export default UpdateCourses;
