import {ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED} from "../types";

const initialState = {
  allPosts: [],
  bookedPosts: [],
  isLoading: true
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS: return {...state, isLoading: false, allPosts: action.payload, bookedPosts: action.payload.filter(p => p.booked)}
    case ADD_POST: return {...state, allPosts: [action.payload, ...state.allPosts]};
    case REMOVE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter(p => p.id !== action.payload),
        bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
      };

    case TOGGLE_BOOKED:
      const allPosts = state.allPosts.map( p => {
        if (p.id === action.payload)
          p.booked = !p.booked;
        return p;
      });

      return {...state, allPosts: allPosts, bookedPosts: allPosts.filter(p => p.booked) }
      
    default: return state;
  }
};