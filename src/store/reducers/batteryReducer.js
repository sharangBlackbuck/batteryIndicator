import { fromJS } from 'immutable';
import { BATTERIES_FETCHED } from '../constants';


// The initial state of the App
const initialState ={
  batteryList: false,
};

const batteryReducer= (state = initialState, action) =>{
  switch (action.type) {
    case BATTERIES_FETCHED:
      return {...state,batteryList:action.response};
    default:
      return state;
  }
}

export default batteryReducer;
