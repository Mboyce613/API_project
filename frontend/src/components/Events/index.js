import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import EventIndexItem from './EventsIndexItem.js';
import { fetchEvents } from '../../store/events.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const EventIndex = () => {

  useEffect(()=>{
    dispatch(fetchEvents())
  },[])

  const data = useSelector(state=>state.events)
  console.log('hi im state', data)
  const events = Object.values(data); // populate from Redux store
  const dispatch = useDispatch()



  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <>
    <Link to={`/events`}>Events</Link>
    <Link to={`/groups`}>Groups</Link>
    <div>Events in Meetup</div>
    <section>
        {events.map((event) => (
          <Link to={`/events/${event.id}`}>{<EventIndexItem event={event} key={event.id}/>}</Link>
        ))}
    </section>
    </>
  );
};

export default EventIndex;