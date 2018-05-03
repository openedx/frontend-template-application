import React from 'react';
import PropTypes from 'prop-types';

class CoursewareNav extends React.Component {
  componentDidMount() {
    this.props.getCourseOutline();
  }

  renderTreeNode(node) {
    let subtree = '';
    if (node.descendants) {
      subtree = (
        <ul>
          {node.descendants.map(item => this.renderTreeNode(item))}
        </ul>
      );
    }

    return (
      <li key={node.id}>
        {node.displayName}
        {subtree}
      </li>
    );
  }

  render() {
    return (
      <nav id="navigation">
        <h1>{this.props.courseOutline.displayName}</h1>
        <ul>
          {this.renderTreeNode(this.props.courseOutline)}
        </ul>
      </nav>
    );
  }
}

CoursewareNav.defaultProps = {
  courseOutline: {
    displayName: '',
    descendants: [],
  },
  getCourseOutline: () => {},
};

CoursewareNav.propTypes = {
  courseOutline: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  getCourseOutline: PropTypes.func,
};

export default CoursewareNav;
