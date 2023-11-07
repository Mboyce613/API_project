import { Link } from 'react-router-dom';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';

const EventIndexItem = ({ event }) => {
  const dispatch = useDispatch()

  return (
    <li>
      <div className="li-contents-flex">
        <Link to={`/events/${event.id}`}>event #{event.id}</Link>
        <div className="buttons-container">
          <Link
            className="edit-link"
            to={`/events/${event.id}/edit`}
          >
            Edit
          </Link>
        </div>
      </div>
    </li>
  );
};

export default EventIndexItem;