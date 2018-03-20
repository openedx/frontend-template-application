import { connect } from 'react-redux';
import PostsPage from '../components/PostsPage';
import { fetchPosts } from '../data/actions';

const mapStateToProps = state => (
  {
    posts: state.posts.posts,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getPosts: () => dispatch(fetchPosts()),
  }
);

const CurrentPostsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsPage);

export default CurrentPostsPage;
