import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const DtEvent = () => {
    const [events, setEvents] = useState([]);
    const supabaseURL = import.meta.env.VITE_URL;
    const supabaseKEY = import.meta.env.VITE_API_KEY;
    const supabase = createClient(supabaseURL, supabaseKEY);


    useEffect(() => {
        async function getEvents() {
            const { data, error } = await supabase.from('Events').select();
            if (error) {
                console.warn(error);
            }
            console.log(data);
            setEvents(data);
        }
        getEvents();
    }, []);
    console.log(events);
    const display = (eventList) => {
        const [isHovered, setIsHovered] = useState(false);
        return (
            <div>
                {eventList.map((Event) => (
                    <div className="event"
                        key={Event.id}  
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <div className="event-image">
                            <img src={Event.Image} alt={`Event: ${Event.Title}`} />
                        </div>
                        <div className="event-details">
                            <p className="event-date">{Event.Year}</p>
                            <p className="event-name">{Event.Title}</p>
                            {isHovered && (
                                <div className="popup">
                                    <p>{Event.About}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return <div>{display(events)}</div>;
};

export default DtEvent;
