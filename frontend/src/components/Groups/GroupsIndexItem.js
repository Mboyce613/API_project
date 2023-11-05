import { Link } from 'react-router-dom';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';

const GroupIndexItem = ({ group }) => {
  const dispatch = useDispatch()

  return (
    <li>
      <div className="li-contents-flex">
        <Link to={`/groups/${group.id}`}>group #{group.id}</Link>
        <div className="buttons-container">
          <Link
            className="edit-link"
            to={`/groups/${group.id}/edit`}
          >
            Edit
          </Link>
        </div>
      </div>
    </li>
  );
};

export default GroupIndexItem;