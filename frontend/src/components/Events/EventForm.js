import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createTheEvent, createTheEventImage } from '../../store/events.js';
import { useReducer } from 'react';

const EventForm = () => {
    const [name, setName] = useState('')
    const [describe, setDescribe] = useState('')
    const [online, setOnline] = useState('')
    const [url, setUrl] = useState('')
    const [pri, setPri] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [errors, setErrors] = useState({})
    const [placeHolder, Update] = useReducer(x => x + 1, 0);
    const dispatch = useDispatch()
    const history = useHistory()

const group = useSelector(state=>state.groupState.currGroup)
const user = useSelector(state=>state.session.user)

//   useEffect(()=>{
   
//   },[errors])

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
    // const newErrors = {}

if(!name.length || name.length < 4) errors.name = "Name is required"

if(!describe.length || describe.length < 4) errors.describe = "Description must be at least 30 characters long"

if(!online) errors.online = "Event Type is required"

if(!url.length || url.length < 4) errors.url = "Image URL must end in .png, .jpg, or .jpeg"

if(!pri) errors.pri = "Price is required"

if(!startTime.length || startTime.length < 4) errors.startTime = "Event start is required"

if(!endTime.length || endTime.length < 4) errors.endTime = "Event end is required"

// console.log('payloadvallidate ',errors)
setErrors(errors)
}

const handleSubmit = async(e) => {
    e.preventDefault();
    payloadValidate()
    console.log(payload)
    // console.log('hadlesubmit',errors)

    const refresh = () => {
        Update();
    }
    refresh()

    console.log('THE ERRORS',errors)
    console.log(Object.values(errors).length)

    if(!Object.values(errors).length){
      console.log('OKED',errors)

      const sendIt = {
        venueId: 666,
        name: payload.name,
        type: payload.online,
        capacity: 666,
        price: payload.pri,
        description: payload.describe,
        startDate: payload.startTime,
        endDate: payload.endTime,
        hostFirstName: user.firstName,
        hostLastName: user.lastName
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
      if(group.id){
        await dispatch(createTheEventImage(sendUrl,event.id))
        history.push(`/events/${event.id}`)
      }
    }else{

        reset();
        return console.log('jokes on me')
    }
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
<section className='creategrouppage'>
    <div id='bold'>Create a new event for {group.name}</div>
<section className='form'>
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

<section className='form2'>
    <header>Is this an in-person on online event?</header>
    <select onChange={(e) => setOnline(e.target.value)} value={online}>
    <option value="" disabled={true}>(Select One)</option>
    <option value='In person' id='In person'>In Person</option>
    <option value='Online' id='Online'>Online</option>
    </select>
    {errors.online && <div className='errors'>{errors.online}</div>}
    <div></div>
    <header>What is the price for your event?</header>
    <input 
    type="number" 
    onChange={(e) => setPri(e.target.value)}
    placeholder={0}
    value={pri} />
    {errors.pri && <div className='errors'>{errors.pri}</div>}
    
</section>


<section className='form2'>
    <header>When does your event start?</header>
    <input
    type='text'
    onChange={(e) => setStartTime(e.target.value)}
    value={startTime}
    placeholder='YYYY/MM/DD,HH/mm AM' 
    name='startTime'
    />
    {errors.startTime && <div className='errors'>{errors.startTime}</div>}

    <header>When does your event end?</header>
    <input
    type='text'
    onChange={(e) => setEndTime(e.target.value)}
    value={endTime}
    placeholder='YYYY/MM/DD,HH/mm AM'  
    name='endTime'
    />
      {errors.endTime && <div className='errors'>{errors.endTime}</div>}
</section>

<section className='form2'>
<div>Please add an image url for your event below:</div>
        <input
        placeholder='Image Url'
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        name='url'
        />
        
        {errors.url && <div className='errors'>{errors.url}</div>}
</section>

    <section className='form2'>
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
        <button className='creategroubbutton' disabled={Object.values(errors).length}>Create Event</button>

    </section>
    </section>

    </form>
    </>
  );
};

export default EventForm;