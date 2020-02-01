import {
    FETCH_BATTERIES,
    BATTERIES_FETCHED
} from '../constants/batteryListConstants';

export const fetchBatteries=()=>{
    return {
        type: FETCH_BATTERIES
    }
}

export const BatteriesFetched=(response)=>{
    return {
        type: BATTERIES_FETCHED,
        response
    }
}