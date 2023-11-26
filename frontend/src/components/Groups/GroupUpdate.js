import { useHistory, Redirect } from 'react-router-dom';
import { updateTheGroup } from '../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useReducer } from 'react';

const GroupUpdate = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let preLoad = useSelector(state=>state.groupState.currGroup)
    const user = useSelector(state=>state.session.user)
    // const preLocation = 
    if(!Object.values(preLoad).length){
        // dispatch(fetchGroupInfo(1))
        preLoad.GroupImages = ['no']
    }
    console.log('PRELOAD',preLoad)
    const [location, setLocation] = useState(`${preLoad.city},${preLoad.state}`)
    const [city, setCity] = useState(preLoad.city)
    const [state, setState] = useState(preLoad.state)
    const [name, setName] = useState(preLoad.name)
    const [describe, setDescribe] = useState(preLoad.about)
    const [online, setOnline] = useState(preLoad.type)
    const [url, setUrl] = useState(preLoad?.GroupImages[0].url)
    const [pri, setPri] = useState(preLoad.private)
    const [errors, setErrors] = useState({})
    
    const [placeHolder, Update] = useReducer(x => x + 1, 0);



const payload = {
    location,
    name,
    describe,
    online,
    url,
    pri
}

const payloadValidate = () =>{
if(!location.length || location.length < 4) errors.location = "Location is required"

if(!name.length || name.length < 4) errors.name = "Name is required"

if(!describe.length || describe.length < 4) errors.describe = "Description must be at least 30 characters long"

if(!online) errors.online = "Group Type is required"

// if(!pri) errors.pri = "Visibility Type is required"

if(!url.length || url.length < 4) errors.url = "Image URL must end in .png, .jpg, or .jpeg"

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

    console.log(errors)
    console.log(Object.values(errors).length)
    if(!Object.values(errors).length){
        console.log('PAYLOAD',payload)
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
       let group = await dispatch(updateTheGroup(sendIt, preLoad.id))
       console.log('GROUP',group)
      // const group = useSelector(state=>state.groupState.currGroup)
      // console.log('RIGHT BEFORE THE PUSH',group)
    //   if(group.id){
    //     await dispatch(createTheGroupImage(sendUrl,group.id))
        history.push(`/groups/${group.id}`)

    //   }
    }
    reset();
  };

  const reset = () => {
    setLocation(`${preLoad.city},${preLoad.state}`);
    setName(preLoad.name);
    setDescribe(preLoad.about);
    setOnline(preLoad.type);
    setUrl(preLoad.GroupImages[0].url);
    setPri(preLoad.pri)
  };

//   console.log('NOT USER',!user)
//   console.log('NOT ORGANIZER',user.id !== preLoad.organizerId)
  if(!user || user.id !== preLoad.organizerId) {

      return <Redirect to="/" />;
  }

  return (
    <>
<form onSubmit={handleSubmit}>
<section className='creategrouppage'>
    <div id='teal'>Update your Group</div>
    <section className='form'>
        <header id='bold'>Set your group's location.</header>
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

    <section className='form'>
    <header id='bold'>What will your group name be?</header>
    <div>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</div>
    <input
    type='text'
    onChange={(e) => setName(e.target.value)}
    value={name}
    placeholder='What is your group name?' 
    name='name'
    />
    
    {errors.name && <div className='errors'>{errors.name}</div>}
    </section>

    <section className='form'>
        <header id='bold'>Describe the purpose of your group.</header>
        <div>People will see this when we promote your group, but you'll be able to add to it later, too. 1. What's the purpose of the group? 2. Who should join? 3. What will you do at your events?</div>
        <textarea 
        placeholder='Please write at least 30 characters'
        onChange={(e) => setDescribe(e.target.value)}
        value={describe}
        name='describe'
        />
        
    {errors.describe && <div className='errors'>{errors.describe}</div>}
    </section>

    <section className='form'>
      <header id='bold'>Final steps...</header>
        <div>Is this an in-person or online group?</div>
        <select onChange={(e) => setOnline(e.target.value)} value={online}>
        <option value="" disabled={true}>(Select One)</option>
        <option value='In person' id='In person'>In Person</option>
        <option value='Online' id='Online'>Online</option>
        </select>
        
        {errors.online && <div className='errors'>{errors.online}</div>}

        <div>Is this group public or private?</div>
        <select onChange={(e) => setPri(e.target.value)} value={pri} defaultValue={false}>
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
        </section>


    <section>
        <button className='creategroubbutton' disabled={Object.values(errors).length}>Update Group</button>

    </section>
    </section>
    </form>
    </>
  );
};

export default GroupUpdate;