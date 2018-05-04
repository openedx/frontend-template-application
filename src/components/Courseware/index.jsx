import React from 'react';

import CoursewareNavContainer from '../../containers/Courseware/CoursewareNavContainer';
import CoursewareContentContainer from '../../containers/Courseware/CoursewareContentContainer';

const Courseware = () => (
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

export default Courseware;
