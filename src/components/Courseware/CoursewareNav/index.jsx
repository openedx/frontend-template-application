import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class CoursewareNav extends React.Component {
  renderTreeNode(node) {
    let subtree = '';
    if (node.descendants) {
      subtree = (
        <ul>
          {node.descendants.map(item => this.renderTreeNode(item))}
        </ul>
      );
    }
    let content = node.displayName;
    if (node.type === 'sequential' && this.props.match) {
      content = (<Link to={`${this.props.match.url}/${node.id}`}>{node.displayName}</Link>);
    }

    return (
      <li key={node.id}>
        {content}
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

CoursewareNav.propTypes = {
  courseOutline: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(CoursewareNav);
