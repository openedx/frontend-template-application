import React from 'react';
import { Icon } from '@edx/paragon';

const ExploreCourses = () => (
  <div className="card">
    <div className="card-body">
      <p className="card-text small">Browse recently launched courses and see what&apos;s new in your favorite subjects.</p>
      <a className="btn btn-outline-primary btn-block" href={`${process.env.LMS_BASE_URL}/courses`}>
        <Icon className={['fa', 'fa-search', 'mr-2']} />
        Explore Courses
      </a>
    </div>
  </div>
);

export default ExploreCourses;
