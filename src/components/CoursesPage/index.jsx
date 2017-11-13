import React from 'react';
import PropTypes from 'prop-types';

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.courses}
      </div>
    );
  }
}

export default CoursesPage;
