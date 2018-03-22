import { connect } from 'react-redux';

import CommentSearch from '../../components/CommentSearch';
import { fetchComment } from '../../data/actions/comment';

const mapStateToProps = state => (
  {
    commentDetails: state.comment.details,
    errorFetching: state.comment.errorFetching,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getComment: commentId => dispatch(fetchComment(commentId)),
  }
);

const CommentSearchPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentSearch);

export default CommentSearchPage;
