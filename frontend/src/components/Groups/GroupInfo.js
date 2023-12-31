import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEventsByGroupId } from '../../store/groups';
import { fetchGroupInfo } from '../../store/groups';
import DeleteModal from '../DeleteModal/index.js';
import OpenModalButton from '../OpenModalButton/index.js';


const GroupInfo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch() 
  const history = useHistory()
  const ulRef = useRef();

    let groupId = useParams()
    groupId = Number(groupId.groupId)

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!ulRef.current?.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener('click', closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
    const closeMenu = () => setShowMenu(false);
    
    useEffect(()=>{
        dispatch(fetchGroupInfo(groupId))
        .then(()=>dispatch(fetchEventsByGroupId(groupId)))
        .then(()=>setIsLoading(false))
      },[dispatch, groupId])

    const group = useSelector(state=>state.groupState.currGroup)
    const user = useSelector(state=>state.session.user)
    let events = useSelector(state=>state.groupState.groupEvents)

    const compare = (a, b) => {
      const dateA = a.startDate;
      const dateB = b.startDate;
      return dateA > dateB ? dateA : dateB;
    };

    // events = events.sort(compare).reverse()
    // console.log('EVENTS',events)

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
        events = events.sort(compare).reverse()
        // console.log('EVENTS',events)

const groupImage = group.GroupImages.find((image)=>image.preview === true )
// console.log('Im the image', groupImage)

    return (
      <>
      <div></div>
      <Link to='/groups'>Groups</Link>
      <section className = 'groupBox'>
      <img className='detailgroupimage' src={groupImage.url} />
        <section className="groupinfoinfo">
          <div>{group.name}</div>
          <div className='isgray'>{group.city}, {group.state}</div>
          {/* <div>{group.about}</div> */}
          <div className='isgray'>{group.numEvents} Events {"\u00b7"} {gPrivate}</div>
          {/* <div>{"\u00b7"}</div>
          <div>{gPrivate}</div> */}
          <div className='isgray'>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</div>
          <div className="buttons-container">
            {showJoin && <button className='jointhisgroupbutton' onClick={()=>{alert('Feature coming soon')}}>Join this group</button>}
            {isOrganizer && <button onClick={()=>{history.push(`/events/new`)}}>Create event</button>}
            {isOrganizer && <button onClick={()=>{history.push(`/groups/update`)}}>Update</button>}
            {isOrganizer && <OpenModalButton
              itemText="Are You Sure?"
              buttonText="Delete"
              modalComponent={<DeleteModal
              groupId={group.id}
              />}

            />}
          </div>
        </section>
        </section>
        <section className='graybackground'>
        <section className='groupBox2'>
          <div className='organizer'>Organizer</div>
          <div className='isgray'>{group.Organizer.firstName} {group.Organizer.lastName}</div>
          <div className='organizer'>What we're about</div>
          <div>{group.about}</div>
          <div> Events ({group.numEvents})</div>
        </section>
        <section className='groupevents'>
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
            </>
            )

          })}
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

export default GroupInfo;