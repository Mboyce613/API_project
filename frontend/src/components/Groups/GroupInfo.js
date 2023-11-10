import { Link, useParams } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groups';
import { fetchGroupInfo } from '../../store/groups';
import EventsIndexItem from '../Events/EventsIndexItem.js'

const GroupInfo = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

    let groupId = useParams()
    groupId = Number(groupId.groupId)

    useEffect(()=>{
        dispatch(fetchGroupInfo(groupId)).then(()=>setIsLoading(false))
      },[dispatch, groupId])

    const data = useSelector(state=>state.groups)
    const group = data[groupId]
    console.log('GROUP FROM STATE',group)

  // let gPrivate = ''
  // if(group.private) gPrivate = 'Private'
  // if(!group.private) gPrivate = 'Public'

  if(!isLoading){
    return (
      <>
      <Link to='/groups'>Groups</Link>
      <div className = 'groupBox'>
      <img src={group.GroupImages[0].url} />
        <div className="li-contents-flex">
          <div>{group.name}</div>
          <div>{group.city}, {group.state}</div>
          <div>{group.about}</div>
          <div>{group.numEvents} Events</div>
          {/* <div>{gPrivate}</div> */}
          <div>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</div>
          <div className="buttons-container">
            <button>Join this group</button>
          </div>
        </div>
        </div>
        <section>
          <div>Organizer</div>
          <div>{group.Organizer.firstName} {group.Organizer.lastName}</div>
          <div>What we're about</div>
          <div>{group.about}</div>
          <div>Upcoming Events ({group.numEvents})</div>
          <div>{group.Events.map((event) => (
          <Link to={`/events/${event.id}`}>{<EventsIndexItem event={event} key={event.id} />}</Link>
        ))}</div>
        </section>
      </>
    );
  }else{
    return(
      <div>Im Loading...</div>
    )
  }
};

export default GroupInfo;