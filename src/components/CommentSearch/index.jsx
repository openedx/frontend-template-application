import React, { Component } from 'react';
import { InputText, Button, StatusAlert } from '@edx/paragon';
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';

import CommentDetails from '../CommentDetails';

class CommentSearch extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = { commentId: '' };
  }

  handleSubmit() {
    this.props.getComment(this.state.commentId);
  }

  handleInputChange(commentId) {
    this.setState({ commentId });
  }

  render() {
    return (
      <div>
        <StatusAlert
          open={this.props.errorFetching}
          dialog="Invalid Comment ID"
          onClose={() => {}}
        />
        <InputText
          name="comment-id-input"
          label="Input a Comment ID"
          value=""
          description="Comment ID to search by"
          onChange={this.handleInputChange}
        />
        <Button label="Search for Comment By ID" onClick={this.handleSubmit} />
        {
          this.props.commentDetails
          && !this.props.errorFetching
          && <CommentDetails {...this.props.commentDetails} />
        }
      </div>
    );
  }
}

CommentSearch.defaultProps = {
  commentDetails: {
    id: null,
    postId: null,
    name: '',
    email: 'example@example.com',
    body: '',
  },
  getComment: () => {},
  errorFetching: false,
};

CommentSearch.propTypes = {
  commentDetails: PropTypes.shape({
    id: PropTypes.number,
    postId: PropTypes.number,
    name: PropTypes.string,
    email: emailPropType,
    body: PropTypes.string,
  }),
  getComment: PropTypes.func,
  errorFetching: PropTypes.bool,
};

export default CommentSearch;
