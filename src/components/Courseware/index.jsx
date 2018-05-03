import React from 'react';
import PropTypes from 'prop-types';

import CoursewareNavContainer from '../../containers/Courseware/CoursewareNavContainer'
import CoursewareContentContainer from '../../containers/Courseware/CoursewareContentContainer';

class Courseware extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <CoursewareNavContainer />
          </div>
          <div className="col-9">
            <CoursewareContentContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Courseware;
