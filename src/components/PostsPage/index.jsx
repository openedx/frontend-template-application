import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from '@edx/paragon';

class PostsPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      checked: false,
    };
  }

  onChange() {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.onChange();
      }
    });
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
            && this.props.posts.slice(10).map(post => <span>{post.title}</span>)
          }
        </div>
      </div>
    );
  }
}

PostsPage.defaultProps = {
  posts: [],
  onChange: () => {},
};

PostsPage.propTypes = {
  posts: PropTypes.array,
  onChange: PropTypes.func,
};

export default PostsPage;
