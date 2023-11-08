import { Link, useParams } from 'react-router-dom';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groups';
import { fetchGroupInfo } from '../../store/groups';

//! Looks like works, but loses state and brakes on refresh.

const GroupInfo = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

    let groupId = useParams()
    // console.log('line 16',groupId)
    groupId = Number(groupId.groupId)
    // console.log('line 18',groupId)
    // console.log('the group id', groupId.groupId)
    useEffect(()=>{
        dispatch(fetchGroupInfo(groupId)).then(()=>setIsLoading(false))
      },[dispatch, groupId])

    const data = useSelector(state=>state.groups)
    // console.log('hi im group info state', data)
    const group = data
    // console.log('the group is ',group)
  let gPrivate = ''
  if(group.private) gPrivate = 'Private'
  if(!group.private) gPrivate = 'Public'

  return (
    <>
    <div className = 'groupBox'>
    <img src={group.previewImage} />
      <div className="li-contents-flex">
        <div>{group.name}</div>
        <div>{group.city}, {group.state}</div>
        <div>{group.about}</div>
        <div>{group.numEvents} Events</div>
        <div>{gPrivate}</div>
        <div className="buttons-container">
          {/* <Link className="edit-link" to={`/groups/${group.id}/edit`}> Edit </Link> */}
        </div>
      </div>
      </div>
    </>
  );
};

export default GroupInfo;