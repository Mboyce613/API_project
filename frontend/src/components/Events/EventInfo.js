import { Link, useParams } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEvents } from '../../store/events.js';
import { fetchEventInfo } from '../../store/events.js';

const EventInfo = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

    let eventId = useParams()
    eventId = Number(eventId.eventId)

    useEffect(()=>{
        dispatch(fetchEventInfo(eventId)).then(()=>setIsLoading(false))
      },[dispatch, eventId])

    const event = useSelector(state=>state.eventState.currEvent)
    const group = useSelector(state=>state.groupState.groups[event.groupId])
    // const group = useSelector(state=>state.groupState.groups)
    // const event = data[eventId]
    console.log('THE EVENT DATA',event)
    console.log('THE GROUP DATA',group)
    
    if(!isLoading){
    const {startDate} = event
    const startTime = startDate.split('T')
    const startYear = startTime[0]
    let startHour = startTime[1]
    startHour = startHour.slice(0,5)

    const {endDate} = event
    console.log('ENDDATE',endDate)
    const endTime = endDate.split('T')
    const endYear = endTime[0]
    let endHour = endTime[1]
    endHour = endHour.slice(0,5)

    return (
      <>
      <Link to='/events'>Events</Link>

        <section>
        <div>{event.name}</div>
        <div>Hosted by {group.Organizer.firstName} {group.Organizer.lastName}</div>
        </section>

      <img src={event.EventImages[0].url} />

      <section>
        <img src={group.GroupImages[0].url} />
        <div>{group.name}</div>
        <div>{group.private}</div>
      </section>

      <section>
        <div>START {startYear} * {startHour}</div>
        <div>END {endYear} * {endHour}</div>
        <div>cost</div>
        <div>{event.type}</div>
      </section>

      <section>
      <div>Details</div>
      <div>{event.about}</div>
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