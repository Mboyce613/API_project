import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <section className='Navigation'>

      <section className='Logo'>
        <NavLink exact to="/">
          <img src={logo}/>
          </NavLink>
      </section>

      {isLoaded && (
        <section className='ProfileButton'>
        <>
        {sessionUser && (<Link to='/groups/new'>Start a new group</Link>)}
          <ProfileButton user={sessionUser} />
        </>
        </section>
      )}
    </section>
  );
}

export default Navigation;