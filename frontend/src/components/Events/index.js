import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { fetchEvents } from '../../store/events.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './index.css'

const EventIndex = () => {

  useEffect(()=>{
    dispatch(fetchEvents())
  },[])

  const data = useSelector(state=>state.eventState.events)
  // console.log('hi im state', data)
  const events = Object.values(data); // populate from Redux store
  const dispatch = useDispatch()



  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <>
    <Link className='eventslinkE' to={`/events`}>Events</Link>
    <Link className='groupslinkE' to={`/groups`}>Groups</Link>
    <div className='subtextE'>Events in Meetup</div>
    <hr className='solid'/>
    <section className='eventlist'>
          {events.map(event=>{
            // {console.log('MAPPED EVENT', event)}
            const {startDate} = event
            const time = startDate.split('T')
            const year = time[0]
            let hour = time[1]
            hour = hour.slice(0,5)
            return(
            <>
            <Link to={`/events/${event.id}`}>
            <img src={event.previewImage}></img>
            <div>{event.description}</div>
            <div>{year} {"\u00b7"} {hour}</div>
            <div>{event.name}</div>
            {/* <div>{event.Venue.city} {event.Venue.state}</div> */}
            </Link>
            <hr className='solid'/>
            </>
            )

          })}
        </section>
    </>
  );
};

export default EventIndex;