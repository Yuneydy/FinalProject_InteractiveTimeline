import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ date, image, eventName, about}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
    <div className="event"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
      <div className="evennpt-image">
        <img src={image} alt={`Event: ${eventName}`} />
      </div>
      <div className="event-details">
        <p className="event-date">{date}</p>
        <p className="event-name">{eventName}</p>
        {isHovered && (
          <div className="popup">
            <p>{about}</p>
          </div>
        )}
      </div>
    </div>
  );
};
Event.propTypes = {
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired
};

  export default Event;