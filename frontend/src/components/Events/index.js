import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { fetchEvents } from '../../store/events.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './index.css'
import { useState } from 'react';

const EventIndex = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    dispatch(fetchEvents()).then(setIsLoading(false))
  },[])

  const data = useSelector(state=>state.eventState.events)
  // console.log('hi im state', data)
  const events = Object.values(data); // populate from Redux store
  const dispatch = useDispatch()



  /* **DO NOT CHANGE THE RETURN VALUE** */
  if(!isLoading){
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
            <Link className ='eventlink' to={`/events/${event.id}`}>
            <section className='eventimageandinfo'>
            <img className ='eventimage' src={event.previewImage}></img>
            <section className='eventinfo'>
            <div className='eventyear'>{year} {"\u00b7"} {hour}</div>
            <div className='eventname'>{event.name}</div>
            {event.Venue?<div className='eventlocation'>{event.Venue.city} {event.Venue.state}</div>:<div className='isgray'>City: Unknown, State: Mystery</div>}
            </section>
            </section>
            <div className ='eventdesc'> {event.description}</div>
            </Link>
            <hr className='solid'/>
            </>
            )

          })}
        </section>
    </>
  );
};
}

export default EventIndex;