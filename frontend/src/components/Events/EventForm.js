import { Link, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createTheEvent } from '../../store/events.js';

const EventForm = () => {
    const [name, setName] = useState('')
    const [describe, setDescribe] = useState('')
    const [online, setOnline] = useState('')
    const [url, setUrl] = useState('')
    const [pri, setPri] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()

const group = useSelector(state=>state.groupState.currGroup)

//   useEffect(()=>{
//     dispatch(fetchGroups())
//   },[])

//   const data = useSelector(state=>state.groupState.groups)
  // console.log('hi im state', data)
//   const groups = Object.values(data); // populate from Redux store
//   const dispatch = useDispatch()
const payload = {
    name,
    online,
    pri,
    startTime,
    endTime,
    url,
    describe,
}

const payloadValidate = () =>{
    const newErrors = {}

if(!name.length || name.length < 4) newErrors.name = "I ain't no holla back girl!"

if(!describe.length || describe.length < 4) newErrors.describe = "No really tell me about yourself, Im a nice guy I swear!"

if(!online) newErrors.online = "So whats the plan"

if(!url.length || url.length < 4) newErrors.url = "Let me see your pics"

// console.log('payloadvallidate ',newErrors)
setErrors(newErrors)
}

const handleSubmit = async(e) => {
    e.preventDefault();
   await payloadValidate()
    console.log(payload)
    // console.log('hadlesubmit',errors)
    console.log('THE ERRORS',errors)
    console.log(Object.values(errors).length)
    if(!Object.values(errors).length){
      
      const sendIt = {
        venueId: 666,
        name: payload.name,
        type: payload.online,
        capacity: 666,
        price: payload.pri,
        description: payload.describe,
        startDate: payload.startTime,
        endDate: payload.endTime
      }

      const sendUrl = {
        url: payload.url,
        preview: true
      }

      console.log('ALL GOOD',sendIt)
       let event = await dispatch(createTheEvent(sendIt,group.id))
       console.log('EVENT',event)
      // const group = useSelector(state=>state.groupState.currGroup)
      // console.log('RIGHT BEFORE THE PUSH',group)
    //   if(group.id){
    //     //image dispach here
    //     await dispatch(createTheGroupImage(sendUrl,group.id))
    //     history.push(`/events/${event.id}`)

    //   }
    }
    reset();
    // history.push(`/groups/${}`)
  };

  const reset = () => {
    setName('');
    setOnline('');
    setPri('')
    setStartTime('')
    setEndTime('')
    setUrl('');
    setDescribe('');
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
    <div>Create a new event for {group.name}</div>
<section>
    <header>What is the name of your event?</header>
    <div>
    <input
    type='text'
    onChange={(e) => setName(e.target.value)}
    value={name}
    placeholder='Event Name?' 
    name='name'
    />
    </div>
    {errors.name && <div className='errors'>{errors.name}</div>}
</section>

<section>
    <header>Is this an in-person on online event?</header>
    <select onChange={(e) => setOnline(e.target.value)} value={online}>
    <option value="" disabled={true}>(Select One)</option>
    <option value='In person' id='In person'>In Person</option>
    <option value='Online' id='Online'>Online</option>
    </select>
    {errors.online && <div className='errors'>{errors.online}</div>}
</section>

<section>
    <header>What is the price for your event?</header>
    <input 
    type="number" 
    onChange={(e) => setPri(e.target.value)}
    placeholder={0}
    value={pri} />
    {errors.pri && <div className='errors'>{errors.pri}</div>}
</section>

<section>
    <header>When does your event start?</header>
    <input
    type='text'
    onChange={(e) => setStartTime(e.target.value)}
    value={startTime}
    placeholder='MM/DD/YYY,HH/mm AM' 
    name='startTime'
    />
</section>

<section>
    <header>When does your event end?</header>
    <input
    type='text'
    onChange={(e) => setEndTime(e.target.value)}
    value={endTime}
    placeholder='MM/DD/YYY,HH/mm PM' 
    name='endTime'
    />
</section>

<section>
<div>Please add an image url for your event below:
        <input
        placeholder='Image Url'
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        name='url'
        />
        </div>
        {errors.url && <div className='errors'>{errors.url}</div>}
</section>

    <section>
        <header>Please describe your event.</header>
        <div>
        <textarea 
        placeholder='Please write at least 30 characters'
        onChange={(e) => setDescribe(e.target.value)}
        value={describe}
        name='describe'
        />
        </div>
    {errors.describe && <div className='errors'>{errors.describe}</div>}

    </section>

    <section>
        <button>Create Event</button>

    </section>

    </form>
    </>
  );
};

export default EventForm;