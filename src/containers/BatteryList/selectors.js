import { createSelector } from 'reselect';
// import { fromJS } from 'immutable';

const selectBattery = (state) => {
    console.log(state.get('batteryReducer'));
    return state.batteryReducer.get('batteryReducer');
}

const makeSelectBatteryList = () => createSelector(
    selectBattery,
  (batteryState) => {
      console.log(batteryState);
    return batteryState.get('batteryList');}
);


export {
    makeSelectBatteryList,
};
