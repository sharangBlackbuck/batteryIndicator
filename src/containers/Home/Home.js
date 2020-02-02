import React from 'react';
import { connect } from 'react-redux';
import { Layout} from 'antd';
import 'antd/dist/antd.css';
import { push } from 'react-router-redux';
import { useHistory ,withRouter} from "react-router-dom";
import {fetchBatteries }from '../../store/actions';
import bg from "../../assets/images/homePage.jpeg";
import './Home.css';

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      currentBattery:false
    };
  }

  swipe(){
    this.props.history.push(`/battery`);
  }


  render() {
    const { Content } = Layout;
  return ( 
    <Layout>
        <Layout>
          <Content style={{background: '#f8f8f8',}} onMouseUp={() => this.swipe()} onTouchEnd={() => this.swipe()}>
            <img className="bgr" src={bg}/>
          </Content>
        </Layout>
        
      </Layout>
  );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchBatteries: () => dispatch(fetchBatteries()),
    pushLocation: (location) => dispatch(push(location)),
  };
}


// const mapStateToProps=createStructuredSelector({
//     batteryList: makeSelectBatteryList(),
// })

const mapStateToProps=(state)=>{
return {
  batteryList: state.batteryReducer.batteryList
}
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));

