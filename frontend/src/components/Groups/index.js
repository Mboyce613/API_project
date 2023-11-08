import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import GroupIndexItem from './GroupsIndexItem.js';
import { fetchGroups } from '../../store/groups';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const GroupIndex = () => {

  useEffect(()=>{
    dispatch(fetchGroups())
  },[])

  const data = useSelector(state=>state.groups)
  console.log('hi im state', data)
  const groups = Object.values(data); // populate from Redux store
  const dispatch = useDispatch()


  return (
    <>
    <Link to={``}>Events</Link>
    <Link to={``}>Groups</Link>
    <div>Groups in Meetup</div>
    <section>
        {groups.map((group) => (
          <Link to={`/groups/${group.id}`}>{<GroupIndexItem group={group} key={group.id} />}</Link>
          
        ))}
    </section>
    </>
  );
};

export default GroupIndex;