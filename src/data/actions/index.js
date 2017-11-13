import {
  STARTED_FETCHING_COURSES,
  UPDATE_COURSES,
} from '../constants/ActionType';

export const updateCourses = data => (
  {
    type: UPDATE_COURSES,
    courses: data.objects.results,
  }
);

export const fetchCourses = () => (
  dispatch => (
    fetch('https://www.edx.org/api/v1/catalog/search?selected_facets[]=organizations_exact%3AHarvardX%3A%20Harvard%20University')
      .then(data => dispatch(updateCourses(data)))
  )
);
