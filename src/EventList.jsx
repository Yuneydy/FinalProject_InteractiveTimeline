import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Event from './Event';
import { createClient } from '@supabase/supabase-js';

const EventList = () => {
  const supabaseURL = 'https://rbmwyvyisezjkkkbqsgo.supabase.co';
  const supabaseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibXd5dnlpc2V6amtra2Jxc2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwNTcxNzgsImV4cCI6MjAxNzYzMzE3OH0.oRsTgyQrojMSrt8NeZe-hNIR0_YOnwGDWEj58fObRFs';
  const supabase = createClient(supabaseURL, supabaseKEY);
  const [events, setEvents] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    image: '',
    eventName: '',
    about: '',
  });

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleAddEvent = async (event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setNewEvent({ date: '', image: '', eventName: '', about: '' });
    event.preventDefault()

    const title = event.target.elements.newEvent.eventName.value;
    const image = event.target.elements.image.value;
    const year = event.target.elements.date.value;
    const about = event.target.elements.about.value;
    const { error } = await supabase.from('Events').insert({
      Year: year,
      Image: image,
      Title: title,
      About: about
    });
    closePopup();
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <button onClick={openPopup}>Add Event</button>

      {isPopupOpen && (
        <div className="popup">
          <span className="close" onClick={closePopup}>
            &times;
          </span>
          <h2>Add Event</h2>
          <div>
            <label>Date:</label>
            <input type="text" name="date" value={newEvent.date} onChange={handleInputChange} />
          </div>
          <div>
            <label>Image URL:</label>
            <input type="text" name="image" value={newEvent.image} onChange={handleInputChange} />
          </div>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={newEvent.eventName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>About:</label>
            <input type="text" name="about" value={newEvent.about} onChange={handleInputChange} />
          </div>
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}

      <div className="event-container">
        {sortedEvents.map((event, index) => (
          <Event key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

EventList.propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        eventName: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
      })
    ),
  };

export default EventList;
