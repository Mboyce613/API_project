import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import GroupIndexItem from './GroupsIndexItem.js';
import { fetchGroups } from '../../store/groups';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const GroupForm = () => {

//   useEffect(()=>{
//     dispatch(fetchGroups())
//   },[])

//   const data = useSelector(state=>state.groupState.groups)
  // console.log('hi im state', data)
//   const groups = Object.values(data); // populate from Redux store
//   const dispatch = useDispatch()


  return (
    <>
    <title >Start a New Group</title>
    <div>Start a New Group</div>
    <section>
        <header>Set your group's location.</header>
        <div>Meetup groups meet locally, in person, and online. We'll connect you with people in your area.</div>
        <input defaultValue={'City, STATE'}></input>

    </section>
    <header>What will your group name be?</header>
    <div>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</div>
    <input defaultValue={'What is your group name?'}></input>

    <section>
        <header>Describe the purpose of your group.</header>
        <div>People will see this when we promote your group, but you'll be able to add to it later, too. 1. What's the purpose of the group? 2. Who should join? 3. What will you do at your events?</div>
        <textarea defaultValue={'Please write at least 30 characters'}></textarea>

    </section>
        <header>Is this an in-person or online group?</header>
        <div>
        <input input type="radio" id="person" name="in-person" value="in-person"></input>
        <label for="in-person">In Person</label>
        </div>
        <div>
        <input input type="radio" id="online" name="online" value="online"></input>
        <label for="online">Online</label>
        </div>
        
        <div>Please add an image URL for your group below:</div>
        <input defaultValue={'Image Url'}></input>

    <section>

    </section>

    <section>

    </section>
    </>
  );
};

export default GroupForm;