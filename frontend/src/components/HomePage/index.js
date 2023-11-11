import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../../store/groups';
import { fetchEvents } from '../../store/events';

const HomePage = () => {
    const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchGroups())
  },[])

useEffect(()=>{
    dispatch(fetchEvents())
  },[])

  return (
    <>
    <section>
        <div>Im a title</div>
        <div>Im into text</div>
        <div>Im an infographic</div>
    </section>
    
    <section>
        <div>Im a subtitle</div>
        <div>Im a caption</div>
    </section>
    
    <section>
        <div>
            <Link to="/groups">See all groups</Link>
        </div>
        <div>
            <Link to="/events">Find an event</Link>
        </div>
        <div>
            <Link to="/groups/new">Start a group</Link>
             disabled if not logged in
        </div>
    </section>

    <section>
        <button>Join Meetup</button>
    </section>
    </>
  );
};

export default HomePage;