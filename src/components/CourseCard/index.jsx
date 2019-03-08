import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import './CourseCard.scss';

const CourseCard = (props) => {
  const { data } = props;

  const getCourseUrl = () => {
    const baseUrl = process.env.LMS_BASE_URL;
    return `${baseUrl}/courses/${data.course_details.course_id}/course/`;
  };

  const getStartDate = () => {
    const { start } = data;
    const formatted = moment(start).format('MMMM D, YYYY');
    const isFutureDate = moment(start) >= moment();
    return `${isFutureDate ? 'Starts' : 'Started'}: ${formatted}`;
  };

  const getEndDate = () => {
    const { end } = data;
    const formatted = moment(end).format('MMMM D, YYYY');
    const isFutureDate = moment(end) >= moment();
    return `${isFutureDate ? 'Ends' : 'Ended'}: ${formatted}`;
  };

  return (
    <div className="card">
      <a className="card-img-top overflow-hidden" href={getCourseUrl()}>
        <img className="img-fluid" src={data.media.image.small} alt={data.name} />
      </a>
      <div className="card-body">
        <p className="card-subtitle mb-2 text-muted">{data.org} - {data.number}</p>
        <h5 className="card-title">
          <a href={getCourseUrl()}>{data.name}</a>
        </h5>
        {data.short_description && (
          <p className="card-text">{data.short_description}</p>
        )}
        {data.start && (
          <p className={classNames('card-text', { 'mb-0': data.end })}>{getStartDate()}</p>
        )}
        {data.end && (
          <p className="card-text">{getEndDate()}</p>
        )}
      </div>
      <div className="card-footer">
        <a className="btn btn-primary btn-block" href={data.link_to_current_block}>
          Go to Course
        </a>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default CourseCard;
