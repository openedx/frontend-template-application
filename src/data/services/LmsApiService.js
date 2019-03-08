import qs from 'query-string';

import apiClient from '../apiClient';
import store from '../store';

class LmsApiService {
  static baseUrl = process.env.LMS_BASE_URL;

  static fetchEnrolledCourses() {
    const url = `${LmsApiService.baseUrl}/api/enrollment/v1/enrollment`;
    return apiClient.get(url);
  }

  static fetchCourseDetails(courseKey) {
    const url = `${LmsApiService.baseUrl}/api/courses/v1/courses/${courseKey}`;
    return apiClient.get(url);
  }

  static fetchCourseBlocks(courseKey) {
    const { username } = store.getState().authentication;
    const options = {
      course_id: courseKey,
      username,
    };
    const url = `${LmsApiService.baseUrl}/api/courses/v1/blocks/?${qs.stringify(options)}`;
    return apiClient.get(url);
  }
}

export default LmsApiService;
