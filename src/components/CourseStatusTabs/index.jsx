import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const CourseStatusTabs = (props) => {
  const { status, tabs } = props;
  return (
    <ul className="nav nav-tabs mb-4">
      {tabs.map(tab => (
        <li className="nav-item" key={tab.slug}>
          <Link
            className={classNames('nav-link', { active: status === tab.slug })}
            to={`/dashboard/${tab.slug}`}
          >
            {tab.label} ({tab.count})
          </Link>
        </li>
      ))}
    </ul>
  );
};

CourseStatusTabs.propTypes = {
  status: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

export default CourseStatusTabs;
