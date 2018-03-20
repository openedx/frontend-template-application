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

class PostsPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      checked: false,
    };
  }

  onChange() {
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
            onChange={this.onChange}
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

PostsPage.defaultProps = {
  posts: [],
  getPosts: () => {},
};

PostsPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  getPosts: PropTypes.func,
};

export default PostsPage;
