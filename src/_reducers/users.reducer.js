import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.SEARCH_SUCCESS:
      return {
        search: action.result.results
      };  
    case userConstants.SEARCH_FAILURE:
      return {
        error: action.error
      };        
    default:
      return state
  }
}