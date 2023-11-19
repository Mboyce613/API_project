import { useDispatch } from 'react-redux';

const EventIndexItem = ({ event }) => {
  const dispatch = useDispatch()
  // console.log(event)
  const {startDate} = event
  const time = startDate.split('T')
  const year = time[0]
  let hour = time[1]
  hour = hour.slice(0,5)

  //  const  theEvent =  dispatch(loadEventInfo(event.id))
  // console.log('What the goddam fuck',theEvent)
  // const state = useSelector(state=>state.events)
  // console.log(state)

  return (
    <>
    <div className = 'eventBox'>
    <img src={event.previewImage} />
      <div className="li-contents-flex">
        <div>{year} {"\u00b7"} {hour}</div>
        <div>{event.name}</div>
        <div>{event.city}, {event.state}</div>
        <div>{event.about}</div>
        <div>{event.numEvents} Events</div>
        <div className="buttons-container">
        </div>
      </div>
      </div>
    </>
  );
};

export default EventIndexItem;