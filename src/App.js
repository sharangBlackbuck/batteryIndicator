import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';


import BatteryList from './containers/BatteryList/BatteryList';
import Home from './containers/Home/Home';
import './App.css';


class App extends React.Component{

  componentDidMount () {
  }

  render(){
    let routes = (
      <Switch>
      <Route path="/home" component={Home} />
        <Route path="/battery" component={BatteryList} />
        <Redirect to="/home" />
      </Switch>
    );

    return (
      <div>
          {routes}
      </div>
    );

  }
}

export default withRouter( connect( null, null )( App ) );
