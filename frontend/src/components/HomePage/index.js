import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groups';
import { fetchEvents } from '../../store/events';
import './index.css'
import poe from './Poe.jpeg'
import cem from './cemertary.jpg'
import skell from './skell.jpeg'
import ghosts from './ghosts.jpeg'

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
        <div className='titleSection2'>
        <section className='introtext'>
        <h1 className='titleSection1'>Keeping it cool at the crypt</h1>
        <div className='poem'>From childhood’s hour I have not been as others were. I have not seen as others saw. I could not bring my passions from a common spring. From the same source I have not taken my sorrow. I could not awaken my heart to joy at the same tone. And all I lov’d, I lov’d alone.</div>
        </section>
        <div><img className='image' src={poe} alt='Edgar Allen Poe'></img></div>
        </div>
    </section>
    
    <section className='subtitleSection'>
        <div className='subTitleSection1'>Don't be like Poe</div>
        <div className='subTitleSection2'>Languish in misery together, with like minded people.</div>
    </section>
    
    <section className='links'>
        <div >
          <div><img className ="pic1" src={cem}></img></div>
            <Link className='link1' to="/groups" >See all groups</Link>
            <div className='link1text'>Different bites for different frights, find a group that suits you.</div>
        </div>
        <div >
        <img className='pic2' src={skell}></img>
            <div><Link className='link2' to="/events">Find an event</Link></div>
            <div className='link1text'>Find out what gouls near you are doing.</div>
        </div>
        <div >
        <div><img className='pic3' src={ghosts}></img></div>
            {user && <Link className='link3' to="/groups/new" >Start a group</Link>}
            {!user && <Link className='link3dis' to="/groups/new" >Start a group</Link>}
            <div className='link1text'>Dont see a group that speaks to you? Make your own!</div>
        </div>
    </section>

    <section className='join'>
        <button className='joinButton'>Join Meetup</button>
    </section>
    </>
  );
};

export default HomePage;