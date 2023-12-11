import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import React, { useState } from 'react';
const Testing = () => {
    const supabaseURL = 'https://rbmwyvyisezjkkkbqsgo.supabase.co';
    const supabaseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibXd5dnlpc2V6amtra2Jxc2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwNTcxNzgsImV4cCI6MjAxNzYzMzE3OH0.oRsTgyQrojMSrt8NeZe-hNIR0_YOnwGDWEj58fObRFs';
  const supabase = createClient(supabaseURL, supabaseKEY);

  function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
      <div className="modal">
        <div className="modal-content">
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  const [isOpen, setIsOpen] = useState(false);
const [title, setTitle] = useState('');
const [year, setYear] = useState('');
const [image, setImage] = useState('');
const [about, setAbout] = useState('');

const handleSubmit = async (event) => {
    
    const { error } = await supabase.from('Events').insert({
      Title: event.target.elements.title.value,
      About: event.target.elements.about.value,
      Image: event.target.elements.image.value,
      Year: event.target.elements.year.value
    });
    setIsOpen(false);
    setTitle('');
    setAbout('');
    setImage('');
    setYear('');
    alert('Post created successfully, go back to home screen');
  };

  return (
    <div>
        <button onClick={() => setIsOpen(true)}>Add Event</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>
              Year:
              <input
                type="text"
                name="year"
                /*value={year}
                onChange={(e) => setYear(e.target.value)} */
              />
              
            </label>

            <label>
              Event Title:
              <input
                type="text"
                name="title"
                /*value={title}
                onChange={(e) => {
                    e.preventDefault()
                    setTitle(e.target.value)}} */
              />
              
            </label>

            <label>
              Image URL:
              <input
                type="text"
                name="image"
                /*value={image}
                onChange={(e) => setImage(e.target.value)} */
              />
              
            </label>

            <label>
              About:
              <input
                type="text"
                name="about"
                /*value={about}
                onChange={(e) => setAbout(e.target.value)}*/
              />
              
            </label>
          </div>
          <input type="submit" value="Create Post" />

        </form>
      </Modal>
    </div>
  );
};

export default Testing;