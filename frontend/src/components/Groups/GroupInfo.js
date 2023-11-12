import { Link, useParams } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEventsByGroupId, fetchGroups } from '../../store/groups';
import { fetchGroupInfo } from '../../store/groups';
import EventsIndexItem from '../Events/EventsIndexItem.js'

const GroupInfo = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

    let groupId = useParams()
    groupId = Number(groupId.groupId)

    useEffect(()=>{
        dispatch(fetchGroupInfo(groupId))
        .then(()=>dispatch(fetchEventsByGroupId(groupId)))
        .then(()=>setIsLoading(false))
      },[dispatch, groupId])

    const group = useSelector(state=>state.groupState.currGroup)
    const user = useSelector(state=>state.session.user)

    // console.log(user)
    // const group = data[groupId]
    // console.log('GROUP FROM STATE',data)
  
  const isOrganizer = user?.id === group.organizerId
  const noUser = !user
  let showJoin = true
  if(isOrganizer) showJoin = false
  if(noUser) showJoin = false

// console.log('NOUSER',noUser)
// console.log('ISORGANIZER',isOrganizer)


  let gPrivate = ''
  if(group.private) gPrivate = 'Private'
  if(!group.private) gPrivate = 'Public'

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
          <div>{"\u00b7"}</div>
          <div>{gPrivate}</div>
          <div>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</div>
          <div className="buttons-container">
            {showJoin && <button onClick={()=>{alert('Feature coming soon')}}>Join this group</button>}
            {isOrganizer && <button>Create event</button>}
            {isOrganizer && <button>Update</button>}
            {isOrganizer && <button>Delete</button>}
          </div>
        </div>
        </div>
        <section>
          <div>Organizer</div>
          <div>{group.Organizer.firstName} {group.Organizer.lastName}</div>
          <div>What we're about</div>
          <div>{group.about}</div>
          <div> Events ({group.numEvents})</div>
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