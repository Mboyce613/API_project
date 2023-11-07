import { Link, useParams } from 'react-router-dom';
import { Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groups';


const GroupInfo = () => {

    let groupId = useParams()
    // console.log(groupId)
    groupId = Number(groupId.groupId)
    console.log('the group id', groupId)
    useEffect(()=>{
        dispatch(fetchGroups())
      },[])

    const data = useSelector(state=>state.groups)
    console.log('hi im state', data)
    const group = data[groupId]
    console.log(group)
  const dispatch = useDispatch()
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