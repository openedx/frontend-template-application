import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '@edx/paragon';

const PostItem = ({ title, body }) => (
  <div className="post">
    <h3>{title}</h3>
    <span>{body}</span>
  </div>
);

const PostsList = ({ posts }) => (
  <ul>
    {
      posts
        .slice(0, 10)
        .map(post => (
          <li key={post.id}>
            <PostItem title={post.title} body={post.body} />
          </li>
        ))
    }
  </ul>
);

class ToggleablePosts extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
      checked: false,
    };
  }

  handleCheck() {
    this.setState({ checked: !this.state.checked });
    this.props.getPosts();
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <div>
          <CheckBox
            name="activate-posts"
            label="See Posts"
            checked={this.state.checked}
            onChange={this.handleCheck}
          />
        </div>
        <div>
          {
            this.state.checked
            && <PostsList posts={this.props.posts} />
          }
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  title: '',
  body: '',
};

PostItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

PostsList.defaultProps = {
  posts: [],
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

ToggleablePosts.defaultProps = {
  posts: [],
  getPosts: () => {},
};

ToggleablePosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  getPosts: PropTypes.func,
};

export default ToggleablePosts;
