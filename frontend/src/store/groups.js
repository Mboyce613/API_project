import { Dispatch } from "react";
import { loadEvents } from "./events";

/** Action Type Constants: */
export const LOAD_GROUPS = 'groups/LOAD_GROUPS';
export const LOAD_GROUP_INFO = 'groups/LOAD_GROUP_INFO';
export const LOAD_EVENTS_BY_GROUPID = 'groups/LOAD_EVENTS_BY_GROUPID'
export const CREATE_GROUP = 'groups/CREATE_GROUP';
export const READ_GROUP = 'groups/READ_GROUP';
export const UPDATE_GROUP = 'groups/UPDATE_GROUP';
export const DELETE_GROUP = 'groups/DELETE_GROUP';

/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups,
  });

  export const loadGroupInfo = (group) => ({
    type: LOAD_GROUP_INFO,
    group,
  });

  export const loadEventByGroupId = (groupId) =>({
    type: LOAD_EVENTS_BY_GROUPID,
    groupId
  })

  export const createGroup = (group) => ({
    type: CREATE_GROUP,
    group,
  });

  export const readGroup = (group) => ({
    type: READ_GROUP,
    group,
  });

  export const updateGroup = (group) => ({
    type: UPDATE_GROUP,
    group,
  });

  export const deleteGroup = (groupId) => ({
    type: DELETE_GROUP,
    groupId,
  });

  /** Thunk Action Creators: */

export const fetchGroups = (groups) => async(dispatch)=>{
    const res = await fetch('/api/groups')
    // console.log('thunk action creator data', data)
    if(res.ok){
      const data = await res.json()
      res.data = data
      dispatch(loadGroups(data.Groups))
    }else{
      throw res
    }
    }

    export const fetchGroupInfo = (groupId) => async(dispatch)=>{
      // console.log('FETCHGROUPINFO', groupId)
      const res = await fetch(`/api/groups/${groupId}`)
      const data = await res.json()
      // res.data = data
      // console.log('thunk action creator data', data)
      if(res.ok){
        dispatch(loadGroupInfo(data))
      }else{
        throw res
      }
      }

    export const fetchEventsByGroupId = (groupId) => async(dispatch)=>{
      const res = await fetch(`/api/groups/${groupId}/events`)
      const data = await res.json()
      if(res.ok){
        dispatch((loadEventByGroupId(data)))
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
const groupsReducer = (groupState = {groups:{}, currGroup:{}, groupEvents:{}}, action) => {
  // console.log('Line 80 Groupstate',groupState)
  switch (action.type) {
    case LOAD_GROUPS:{
      // console.log('action', action.groups)
        const newState = {}
        action.groups.forEach((group) => {
            newState[group.id] = group;
        });
        // console.log('Line 89 Groupstate',newState)
        return {...groupState, groups:newState};
      }
        
      case LOAD_GROUP_INFO:{
        // console.log('OH NO IM TRIGGERED')
        const id = action.group.id
        const newState = {}
        for(const key in action.group){
          newState[key] = action.group[key]
        }
              // console.log('newState', newState)
        
        return {...groupState, currGroup:newState}
      }

      case LOAD_EVENTS_BY_GROUPID:{
        const newState ={}
        console.log('ACTION',action.groupId.Events)
        // for(const key in action.groupId.Events){
        //   newState[key] = action.groupId.Events[key]
        // }
        return {...groupState, groupEvents:action.groupId.Events}
      }
//! NEED TO NORMALIZE THE DATA ABOVE !

      case CREATE_GROUP:
        return { ...groupState, [action.group.id]: action.group };
      
      case READ_GROUP:
        return { ...groupState, [action.group.id]: action.group };
      
      case UPDATE_GROUP:
        return { ...groupState, [action.group.id]: action.group };
      
      case DELETE_GROUP:
        const newState = { ...groupState };
        delete newState[action.groupId];
        return newState;
      
        default:
        return groupState;
    }
  };
  
  export default groupsReducer;