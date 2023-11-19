import { useDispatch } from 'react-redux';


const GroupIndexItem = ({ group }) => {
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
        <div>{"\u00b7"}</div>
        <div>{gPrivate}</div>
        <div className="buttons-container">
        </div>
      </div>
      </div>
    </>
  );
};

export default GroupIndexItem;