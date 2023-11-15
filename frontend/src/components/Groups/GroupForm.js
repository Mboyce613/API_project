import { Link, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import GroupIndexItem from './GroupsIndexItem.js';
import { createTheGroup, createTheGroupImage, fetchGroups } from '../../store/groups';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const GroupForm = () => {
    const [location, setLocation] = useState('')
    const [name, setName] = useState('')
    const [describe, setDescribe] = useState('')
    const [online, setOnline] = useState('')
    const [url, setUrl] = useState('')
    const [pri, setPri] = useState('')
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()

//   useEffect(()=>{
//     dispatch(fetchGroups())
//   },[])

//   const data = useSelector(state=>state.groupState.groups)
  // console.log('hi im state', data)
//   const groups = Object.values(data); // populate from Redux store
//   const dispatch = useDispatch()
const payload = {
    location,
    name,
    describe,
    online,
    url,
    pri
}

const payloadValidate = () =>{
    const newErrors = {}
if(!location.length || location.length < 4) newErrors.location = "needs a location!"

if(!name.length || name.length < 4) newErrors.name = "I ain't no holla back girl!"

if(!describe.length || describe.length < 4) newErrors.describe = "No really tell me about yourself, Im a nice guy I swear!"

if(!online) newErrors.online = "So whats the plan"

if(!pri) newErrors.pri = "Its very exclusive, you would not have heard about it"

if(!url.length || url.length < 4) newErrors.url = "Let me see your pics"

// console.log('payloadvallidate ',newErrors)
setErrors(newErrors)
}

const handleSubmit = async(e) => {
    e.preventDefault();
   await payloadValidate()
    console.log(payload)
    // console.log('hadlesubmit',errors)
    console.log(errors)
    console.log(Object.values(errors).length)
    if(!Object.values(errors).length){
      const cityState = payload.location.split(',')
      
      const sendIt = {
        name: payload.name,
        about: payload.describe,
        type: payload.online,
        private: payload.pri,
        city: cityState[0].trim(),
        state: cityState[1].trim()
      }

      const sendUrl = {
        url: payload.url,
        preview: true
      }

      console.log('ALL GOOD',sendIt)
       let group = await dispatch(createTheGroup(sendIt))
       console.log('GROUP',group)
      // const group = useSelector(state=>state.groupState.currGroup)
      // console.log('RIGHT BEFORE THE PUSH',group)
      if(group.id){
        //image dispach here
        await dispatch(createTheGroupImage(sendUrl,group.id))
        history.push(`/groups/${group.id}`)

      }
    }
    reset();
    // history.push(`/groups/${}`)
  };

  const reset = () => {
    setLocation('');
    setName('');
    setDescribe('');
    setOnline('');
    setUrl('');
    setPri('')
  };



//   <input
//   type='text'
//   onChange={(e) => setTitle(e.target.value)}
//   value={title}
//   placeholder='Title'
//   name='title'
// />

  return (
    <>
<form onSubmit={handleSubmit}>
    <div>Start a New Group</div>
    <section>
        <header>Set your group's location.</header>
        <div>Meetup groups meet locally, in person, and online. We'll connect you with people in your area.
        <input 
        type='text'
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        placeholder='City, STATE' 
        name='location'
        />
        </div>
        {errors.location && <div className='errors'>{errors.location}</div>}
    </section>

    <header>What will your group name be?</header>
    <div>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.
    <input
    type='text'
    onChange={(e) => setName(e.target.value)}
    value={name}
    placeholder='What is your group name?' 
    name='name'
    />
    </div>
    {errors.name && <div className='errors'>{errors.name}</div>}
    <section>
        <header>Describe the purpose of your group.</header>
        <div>People will see this when we promote your group, but you'll be able to add to it later, too. 1. What's the purpose of the group? 2. Who should join? 3. What will you do at your events?
        <textarea 
        placeholder='Please write at least 30 characters'
        onChange={(e) => setDescribe(e.target.value)}
        value={describe}
        name='describe'
        />
        </div>
    {errors.describe && <div className='errors'>{errors.describe}</div>}
    </section>
        <header>Is this an in-person or online group?</header>
        <select onChange={(e) => setOnline(e.target.value)} value={online}>
        <option value="" disabled={true}>(Select One)</option>
        <option value='In person' id='In person'>In Person</option>
        <option value='Online' id='Online'>Online</option>
        </select>
        
        {errors.online && <div className='errors'>{errors.online}</div>}

        <header>Is this group public or private?</header>
        <select onChange={(e) => setPri(e.target.value)} value={pri}>
        <option value="" disabled={true}>(Select One)</option>
        <option value={true} id='private'>Private</option>
        <option value={false} id='public'>Public</option>
        </select>
        
        {errors.pri && <div className='errors'>{errors.pri}</div>}

        <div>Please add an image URL for your group below:
        <input
        placeholder='Image Url'
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        name='url'
        />
        </div>
        {errors.url && <div className='errors'>{errors.url}</div>}
    <section>
        <button>Create Group</button>

    </section>

    </form>
    </>
  );
};

export default GroupForm;