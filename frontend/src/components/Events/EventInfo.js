import { Link, useParams } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEvents } from '../../store/events';
import { fetchEventInfo } from '../../store/events';

const EventInfo = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

    let eventId = useParams()
    eventId = Number(eventId.eventId)

    useEffect(()=>{
        dispatch(fetchEventInfo(eventId)).then(()=>setIsLoading(false))
      },[dispatch, eventId])

    const data = useSelector(state=>state.events)
    const event = data
    // console.log(data)

//! need # of events, and organizer first and last name.

  if(!isLoading){
    return (
      <>
      <Link to='/events'>Events</Link>
      <div className = 'eventBox'>
      <img src={event.EventImages[0].url} />
        <div className="li-contents-flex">
          <div>{event.name}</div>
          <div>{event.city}, {event.state}</div>
          {/* <div>{event.about}</div> */}
          <div>{event.numEvents} Events</div>
          {/* <div>Organized by {event.Organizer.firstName} {event.Organizer.lastName}</div> */}
          <div className="buttons-container">
            <button>Join this event</button>
          </div>
        </div>
        </div>
        <section>
          <div>Organizer</div>
          {/* <div>{event.Organizer.firstName} {event.Organizer.lastName}</div> */}
          <div>What we're about</div>
          <div>{event.about}</div>
          <div>Upcoming Events ({event.numEvents})</div>
          <div>Place holder (map through each event)</div>
        </section>
      </>
    );
  }else{
    return(
      <div>Im Loading...</div>
    )
  }
};

export default EventInfo;