import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_EVENTS = 'events/LOAD_EVENTS';
export const LOAD_EVENT_INFO = 'events/LOAD_EVENT_INFO';
export const CREATE_EVENT = 'events/CREATE_EVENT';
export const CREATE_EVENT_IMAGE = 'events/CREATE_EVENT_IMAGE';
export const READ_EVENT = 'events/READ_EVENT';
export const UPDATE_EVENT = 'events/UPDATE_EVENT';
export const DELETE_EVENT = 'events/DELETE_EVENT';

/**  Action Creators: */
export const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events,
  });

  export const loadEventInfo = (eventId) => ({
    type: LOAD_EVENT_INFO,
    eventId,
  });

  export const createEvent = (event) => ({
    type: CREATE_EVENT,
    event,
  });

  export const createEventImage = (url,eventId) => ({
    type: CREATE_EVENT_IMAGE,
    eventId,
    url
  });

  export const readEvent = (event) => ({
    type: READ_EVENT,
    event,
  });

  export const updateEvent = (event) => ({
    type: UPDATE_EVENT,
    event,
  });

  export const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId,
  });

  /** Thunk Action Creators: */

export const fetchEvents = (events) => async(dispatch)=>{
    const res = await fetch('/api/events')
    const data = await res.json()
    res.data = data
    // console.log('thunk action creator data', data)
    if(res.ok){
      dispatch(loadEvents(data.Events))
    }else{
      throw res
    }
    }

    export const fetchEventInfo = (eventId) => async(dispatch)=>{
      const res = await fetch(`/api/events/${eventId}`)
      if(res.ok){
        const data = await res.json()
        // console.log('thunk action creator data', data)
        // res.data = data
        dispatch(loadEventInfo(data))
        return data
      }else{
        throw res
      }
      }

      export const createTheEvent = (event,groupId) => async(dispatch)=>{
        console.log('CODE DONT HURT ME, DONT HURT ME, NO MORE',event,groupId)
        // const history = useHistory()
        const res = await csrfFetch(`/api/groups/${groupId}/events`,{
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json"
          // },
          body: JSON.stringify(event)
        })
        const data = await res.json()
        console.log('DOES THE REQUEST HAPPEN?',data)
        if(res.ok){
          dispatch((createEvent(data)))
          //return res
          return data
          // history.push(`/groups/${res.body.id}`)
        }else{
          console.log('I MADE IT',res)
          throw res.errors
        }
      }

      export const createTheEventImage = (url,eventId) => async(dispatch)=>{
        console.log('WHAT IS IMAGE?',url)
        console.log('WHAT IS ID?',eventId)
  
        const res = await csrfFetch(`/api/events/${eventId}/images`,{
          method: "POST",
          body: JSON.stringify(url)
        })
        const data = await res.json()
        console.log('DOES THE REQUEST HAPPEN?',data)
        if(res.ok){
          dispatch((createEventImage(data)))
          return data
        }else{
          console.log('I MADE IT',res)
          throw res.errors
        }
      }
      
      export const deleteTheEvent = (eventId) => async(dispatch)=>{
        console.log("In the thunk", eventId)
  
        const res = await csrfFetch(`/api/events/${eventId}`,{
          method: "DELETE",
        })
        const data = await res.json()
        if(res.ok){
          console.log('Going to the reducer')
          dispatch((deleteEvent(eventId)))
          return data
        }else{
          throw res.errors
        }
      }
    
//     export const deleteReport = (reportId) => async dispatch =>{
//       const response = await fetch(`/api/reports/${reportId}`, {
//         method:'DELETE',
//       });
//       if (response.ok){
//         dispatch(removeReport(reportId))
//         return response.json({message:'Successfully deleted'})
//       }
//     }

/** Reducer */
const eventsReducer = (eventState = {events:{}, currEvent:{}}, action) => {
    switch (action.type) {
      case LOAD_EVENTS:{
      // console.log('action', action.groups)
      const newState = {}
      action.events.forEach((event) => {
          newState[event.id] = event;
      });
      // console.log('Line 89 Groupstate',newState)
      return {...eventState, events:newState};
      }

        case LOAD_EVENT_INFO:{
          // const id = action.event.id
          const newState = {}
          for(const key in action.eventId){
            newState[key] = action.eventId[key]
          }
                // console.log('newState', newState)
          
          return {...eventState, currEvent:newState}
        }

      case CREATE_EVENT:{
        const newState ={...eventState}
        newState.currEvent[action.event.id] = action.event
        newState.events[action.event.id] = action.event
        // console.log("LINE 158", newState)
        return newState
      }

      case CREATE_EVENT_IMAGE:{
        const newState = {...eventState}
        newState.currEvent.EventImages = []
        console.log("ACTION.URL.URL",action.url.url)
        newState.currEvent.EventImages.push(action.url.url)
        console.log("DID IT WORK?",newState.currEvent.EventImages)
        return newState
      }
      
        case READ_EVENT:
        return { ...eventState, [action.event.id]: action.event };
      
        case UPDATE_EVENT:
        return { ...eventState, [action.event.id]: action.event };
      
        case DELETE_EVENT:
          console.log('ACTION',action)
          // console.log('EVENTSTATE',eventState)
          const newState = { ...eventState.events };
          console.log('NEWSTATE',newState)
          // console.log('REDUCER ID',action.eventId)
          console.log('WANT TO DELETE', newState[action.eventId])
          delete newState[action.eventId];
          // newState.currEvent = {}
          // newState.events = {}
          // console.log('DELETED?', newState)
          return {...eventState, newState};
      
        default:
        return eventState;
    }
  };
  
  export default eventsReducer;