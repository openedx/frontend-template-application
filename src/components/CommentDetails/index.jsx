import React from 'react';
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';

const CommentDetails = ({
  id,
  postId,
  name,
  email,
  body,
}) => (
  <ul>
    <li>ID: {id}</li>
    <li>Post ID: {postId}</li>
    <li>Name: {name}</li>
    <li>Email Address: {email}</li>
    <li>Body: {body}</li>
  </ul>
);

CommentDetails.defaultProps = {
  id: null,
  postId: null,
  name: '',
  email: 'example@example.com',
  body: '',
};

CommentDetails.propTypes = {
  id: PropTypes.number,
  postId: PropTypes.number,
  name: PropTypes.string,
  email: emailPropType,
  body: PropTypes.string,
};

export default CommentDetails;
