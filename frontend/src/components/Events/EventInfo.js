import { Link, useParams } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEvents } from '../../store/events.js';
import { fetchEventInfo } from '../../store/events.js';
import { fetchGroupInfo } from '../../store/groups.js';

const EventInfo = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

    let eventId = useParams()
    eventId = Number(eventId.eventId)
    
    const event = useSelector(state=>state.eventState.currEvent)
    // console.log('PRE THUNK EVENT.GROUPID',event.groupId)

    useEffect(()=>{
      // console.log('POST THUNK EVENT.GROUPID',event.groupId)
        dispatch(fetchEventInfo(eventId))
        .then((data)=>dispatch(fetchGroupInfo(data.groupId)))
        .then(()=>setIsLoading(false))
      },[dispatch,eventId,event.groupId])

    const group = useSelector(state=>state.groupState.currGroup)
    
    if(!isLoading){
      // console.log('THE EVENT DATA',event)
      // console.log('THE GROUP DATA',group)
    const {startDate} = event
    const startTime = startDate.split('T')
    const startYear = startTime[0]
    let startHour = startTime[1]
    startHour = startHour.slice(0,5)

    const {endDate} = event
    // console.log('ENDDATE',endDate)
    const endTime = endDate.split('T')
    const endYear = endTime[0]
    let endHour = endTime[1]
    endHour = endHour.slice(0,5)

    let gPrivate = ''
    if(group.private) gPrivate = 'Private'
    if(!group.private) gPrivate = 'Public'

    let price
    if(event.price === 0) price = 'Free'
    if(event.price > 0) price = `$${event.price}`

    return (
      <>
      <Link to='/events'>Events</Link>

        <section>
        <div>{event.name}</div>
        <div>Hosted by {event.hostFirstName} {event.hostLastName}</div>
        </section>

      <img src={event.EventImages[0].url} />

      <section>
        <img src={group.GroupImages[0].url} />
        <div>{group.name}</div>
        <div>{"\u00b7"}</div>
        <div>{gPrivate}</div>
      </section>

      <section>
        <div>START {startYear} {"\u00b7"} {startHour}</div>
        <div>END {endYear} {"\u00b7"} {endHour}</div>
        <div>{price}</div>
        <div>{event.type}</div>
      </section>

      <section>
      <div>Details</div>
      <div>{event.description}</div>
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