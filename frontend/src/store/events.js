import { Dispatch } from "react";

/** Action Type Constants: */
export const LOAD_EVENTS = 'events/LOAD_EVENTS';
export const LOAD_EVENT_INFO = 'events/LOAD_EVENT_INFO';
export const CREATE_EVENT = 'events/CREATE_EVENT';
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
      // console.log('thunk action creator data', data)
      if(res.ok){
        const data = await res.json()
        // res.data = data
        dispatch(loadEventInfo(data))
        return data
      }else{
        throw res
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
          const id = action.event.id
          const newState = {}
          for(const key in action.event){
            newState[key] = action.event[key]
          }
                // console.log('newState', newState)
          
          return {...eventState, currEvent:newState}
        }

      case CREATE_EVENT:
        return { ...eventState, [action.event.id]: action.event };
      
        case READ_EVENT:
        return { ...eventState, [action.event.id]: action.event };
      
        case UPDATE_EVENT:
        return { ...eventState, [action.event.id]: action.event };
      
        case DELETE_EVENT:
        const newState = { ...eventState };
        delete newState[action.eventId];
        return newState;
      
        default:
        return eventState;
    }
  };
  
  export default eventsReducer;