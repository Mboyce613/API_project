import { Link } from 'react-router-dom';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';


const GroupIndexItem = ({ group }) => {
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
        </div>
      </div>
      </div>
    </>
  );
};

export default GroupIndexItem;