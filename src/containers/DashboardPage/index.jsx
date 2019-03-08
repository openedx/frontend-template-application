import { connect } from 'react-redux';
import {
  fetchUserAccount,
  UserAccountApiService,
} from '@edx/frontend-auth';

import DashboardPage from '../../components/DashboardPage';
import { fetchEnrolledCourses } from '../../data/actions/courses';

import apiClient from '../../data/apiClient';

const mapStateToProps = state => ({
  username: state.authentication.username,
  loading: state.courses.loading,
  error: state.courses.error,
  enrolledCourses: state.courses.data,
});

const mapDispatchToProps = (dispatch) => {
  const userAccountApiService = new UserAccountApiService(apiClient, process.env.LMS_BASE_URL);

  return {
    fetchUserAccount: username => dispatch(fetchUserAccount(userAccountApiService, username)),
    fetchEnrolledCourses: () => dispatch(fetchEnrolledCourses()),
  };
};

const ConnectedDashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);

export default ConnectedDashboardPage;
