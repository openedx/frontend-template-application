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
    if (node.type === 'vertical' && this.props.match) {
      content = (
        <Link to={{
          pathname: `${this.props.match.url}/${node.id}`,
          state: { node },
          }}
        >
          {node.displayName}
        </Link>);
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
          { this.props.courseOutline.descendants &&
            this.props.courseOutline.descendants.map(node => this.renderTreeNode(node))
          }
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
