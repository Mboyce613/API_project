import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groups';
import { fetchEvents } from '../../store/events';
import './index.css'
import poe from './Poe.jpeg'
const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);

  useEffect(()=>{
    dispatch(fetchGroups())
  },[])

useEffect(()=>{
    dispatch(fetchEvents())
  },[])

  return (
    <>
    <section className='titleSectionAll'>
        <h1 className='titleSection1'>Keeping it cool at the crypt</h1>
        <div className='titleSection2'>
        <div className='poem'>From childhood’s hour I have not been as others were. I have not seen as others saw. I could not bring my passions from a common spring. From the same source I have not taken my sorrow. I could not awaken my heart to joy at the same tone. And all I lov’d, I lov’d alone.</div>
        {/* <div className='poem'>From childhood’s hour I have not been as others were.  </div>
        <div className='poem'>I have not seen as others saw.</div>
        <div className='poem'>I could not bring my passions from a common spring.</div>
        <div className='poem'>From the same source I have not taken my sorrow. </div>
        <div className='poem'>I could not awaken my heart to joy at the same tone.</div>
        <div className='poem'>And all I lov’d, I lov’d alone.</div> */}
        <div><img className='image' src={poe} alt='Edgar Allen Poe'></img></div>
        </div>
    </section>
    
    <section className='subtitleSection'>
        <div className='subTitleSection1'>Don't be like Poe</div>
        <div className='subTitleSection2'>Languish im misery together, with like minded people.</div>
    </section>
    
    <section className='links'>
        <div className='link1'>
            <Link to="/groups" >See all groups</Link>
            <div>Diffrent bite for Diffrent frights, find a group that suits you.</div>
        </div>
        <div className='link2'>
            <Link to="/events">Find an event</Link>
            <div>Find out what gouls near you are doing.</div>
        </div>
        <div className='link3'>
            {user && <Link to="/groups/new" >Start a group</Link>}
            <div>Dont see a group that speaks to you? Make your own!</div>
        </div>
    </section>

    <section className='join'>
        <button className='joinButton'>Join Meetup</button>
    </section>
    </>
  );
};

export default HomePage;