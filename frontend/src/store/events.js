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

  export const loadEventInfo = (event) => ({
    type: LOAD_EVENT_INFO,
    event,
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
      const data = await res.json()
      res.data = data
      // console.log('thunk action creator data', data)
      if(res.ok){
        dispatch(loadEventInfo(data))
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
const eventsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_EVENTS:
        const eventsState = {};
        action.events.forEach((event) => {
          if(!eventsState[event.id]){
            eventsState[event.id] = event;
          }
        });
        return {...eventsState};

        case LOAD_EVENT_INFO:
          const singleState = {...state}
          const singleInfo = action.event
          const basicEvent = singleState[singleInfo.id]
          for(const keys in singleInfo){
            if(!basicEvent[keys]){
              // console.log(keys)
              basicEvent[keys] = singleInfo[keys]
            }
          }
          // console.log('DID IT WORK?',singleState)
          return singleState

      case CREATE_EVENT:
        return { ...state, [action.event.id]: action.event };
      
        case READ_EVENT:
        return { ...state, [action.event.id]: action.event };
      
        case UPDATE_EVENT:
        return { ...state, [action.event.id]: action.event };
      
        case DELETE_EVENT:
        const newState = { ...state };
        delete newState[action.eventId];
        return newState;
      
        default:
        return state;
    }
  };
  
  export default eventsReducer;