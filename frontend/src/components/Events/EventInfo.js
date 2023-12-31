import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEventInfo } from '../../store/events.js';
import { fetchGroupInfo } from '../../store/groups.js';
import DeleteEventModal from '../DeleteModal/deleteEvents.js';
import OpenModalButton from '../OpenModalButton/index.js';

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
    const user = useSelector(state=>state.session.user)
    
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

    //! WHY FIRST NAME FALSE?
    // const isHost = user?.fristName === event.hostFirstName && user?.lastName === event.hostLastName
    const isHost = user?.lastName === event.hostLastName
    // console.log('USER',user)
    // console.log('HOSTFN',event.hostFirstName)
    // console.log('HOSTLN',event.hostLastName)
    // console.log('ISHOST',isHost)
    // console.log('TEST FN',user?.fristName === event.hostFirstName)
    // console.log('TEST LN',user?.lastName === event.hostLastName)
    let showButtons = false
    if(isHost) showButtons = true
    
    const groupImage = group.GroupImages.find((image)=>image.preview === true )
    const eventImage = event.EventImages.find((image)=>image.preview === true )

    return (
      <>
      <section className='eventdetailsmaster'>
        <section className='eventdetailone'>
        <Link to='/events'>Events</Link>
        <div className='eventdetailname'>{event.name}</div>
        <div className='isgray'>Hosted by {event.hostFirstName} {event.hostLastName}</div>
        </section>
        <section className='graybackground'>
      <section className='eventdetailtwo'>
      <section className='eventdetailimageandinfo'>
      <img className='eventdetaileventimage' src={eventImage.url} />
      <section className='eventdetailgroupandenventinfo'>
      <section className='eventdetailgroupinfo'>
        <img className='eventdetailgroupimage' src={groupImage.url} />
        <section className='eventdetailgroupinfo2'>
        <div>{group.name}</div>
        {/* <div>{"\u00b7"}</div> */}
        <div>{gPrivate}</div>
        </section>
      </section>
      <section className='eventdetaileventinfo'>
        <section className='eventdetailtimesection'>
        <i class="fa-regular fa-clock"></i>
        <section className='eventdetailtimesection2'>
        <div>START {startYear} {"\u00b7"} {startHour}</div>
        <div>END {endYear} {"\u00b7"} {endHour}</div>
        </section>
        </section>
        <section className='money'>
        <i className="fa-solid fa-dollar-sign"></i>
        <section className='money2'>
        <div>{price}</div>
        </section>
        </section>
        <section className='location'>
        <i className="fa-solid fa-map-pin"></i>
        <section className='location2'>
        <div>{event.type}</div>
        </section>
        </section>
        {showButtons && <button>Update</button>}
      {showButtons && <OpenModalButton
              itemText="Are You Sure?"
              buttonText="Delete"
              modalComponent={<DeleteEventModal
              eventId={event.id}
              />}

            />}

      </section>
      </section>
      </section>
      </section>

      <section className='eventdetailsthree'>
      <div>Details</div>
      <div>{event.description}</div>
      </section>
      </section>
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