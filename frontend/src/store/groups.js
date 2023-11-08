import { Dispatch } from "react";

/** Action Type Constants: */
export const LOAD_GROUPS = 'groups/LOAD_GROUPS';
export const CREATE_GROUP = 'groups/CREATE_GROUP';
export const READ_GROUP = 'groups/READ_GROUP';
export const UPDATE_GROUP = 'groups/UPDATE_GROUP';
export const DELETE_GROUP = 'groups/DELETE_GROUP';

/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups,
  });

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
    const data = await res.json()
    res.data = data
    console.log('thunk action creator data', data)
    if(res.ok){
      dispatch(loadGroups(data.Groups))
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
const groupsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_GROUPS:
        const groupsState = {...state};
        action.groups.forEach((group) => {
          if(!groupsState[group.id]){
            groupsState[group.id] = group;
          }
        });
        return {...groupsState};
      case CREATE_GROUP:
        return { ...state, [action.group.id]: action.group };
      case READ_GROUP:
        return { ...state, [action.group.id]: action.group };
      case UPDATE_GROUP:
        return { ...state, [action.group.id]: action.group };
      case DELETE_GROUP:
        const newState = { ...state };
        delete newState[action.groupId];
        return newState;
      default:
        return state;
    }
  };
  
  export default groupsReducer;