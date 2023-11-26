import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import GroupIndexItem from './GroupsIndexItem.js';
import { fetchGroups } from '../../store/groups';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './index.css'

const GroupIndex = () => {

  useEffect(()=>{
    dispatch(fetchGroups())
  },[])

  const data = useSelector(state=>state.groupState.groups)
  // console.log('hi im state', data)
  const groups = Object.values(data); // populate from Redux store
  const dispatch = useDispatch()


  return (
    <>
    <header>
    <Link className='eventslinkG' to={`/events`}>Events</Link>
       {"                                 "}                             
    <Link className='groupslinkG' to={`/groups`}>Groups</Link>
    </header>
    <div className='subtextG'>Groups in Meetup</div>
    <hr className='solid'/>
    <section className='grouplist'>
        {groups.map((group) => (
            
          <>
          <Link className='grouplink'to={`/groups/${group.id}`}>{
                <section className = 'groupimageandinfo'>
                <img className ='groupimage' src={group.previewImage} />
                <section className='groupinfo'>
                    <div>{group.name}</div>
                    <div className='isgray'>{group.city}, {group.state}</div>
                    <div>{group.about}</div>
                    <div className='isgray'>{group.numEvents} Events {"\u00b7"} {group.private && 'Private'}{!group.private && 'Public'} </div>
                  </section>
                  </section>
            }</Link>
          <hr className='solid'/>
          </>
        ))}
    </section>
    </>
  );
};

export default GroupIndex;