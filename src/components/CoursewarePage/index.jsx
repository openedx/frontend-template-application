import React from 'react';
import PropTypes from 'prop-types';

class CoursewarePage extends React.Component {
  constructor(props) {
    super(props);
  }

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
    )}
  
    return (
      <li key={node.id}>
        {node.displayName}
        {subtree}
      </li>
    )
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

CoursewarePage.defaultProps = {
  courseOutline: {
    displayName: '',
    descendants: []
  },
  getCourseOutline: () => {},
};

CoursewarePage.propTypes = {
  courseOutline: PropTypes.object,
  getCourseOutline: PropTypes.func,
};

export default CoursewarePage;
