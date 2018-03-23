import { connect } from 'react-redux';

import ToggleablePosts from '../../components/ToggleablePosts';
import { fetchPosts } from '../../data/actions/posts';

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

const PostsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleablePosts);

export default PostsPage;
