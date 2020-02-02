import React from 'react';
import { connect } from 'react-redux';
import { Layout,Menu,Icon,Row,Col ,Modal,Button} from 'antd';
import Battery from '../../components/Battery/battery'
import 'antd/dist/antd.css';
import {fetchBatteries }from '../../store/actions';
import logo from "../../assets/images/brand.svg";
import './BatteryList.css';

class BatteryList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      currentBattery:false,
      highlightBattery:false
    };
  }

  setBattery = (battery,single) => {
    console.log(battery);
    if(!single){
      this.setState({
        currentBattery: battery,
      });
    }
   
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      currentBattery:false
    });
  };


  componentDidMount() {
    this.props.fetchBatteries();
      let interval = setInterval(()=>{
        this.props.fetchBatteries();
        this.setState({
          highlightBattery: false,
        });
      },4000)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  highlight=()=>{
    let max=this.props.batteryList[0];
    this.props.batteryList.forEach(item => {
      if(max.SOC<item.SOC){
        max=item;
      }
    });

    this.setState({
      highlightBattery: max,
    });
  }

  render() {
  const {batteryList}=this.props;
  console.log(this.state);
    const { Header, Sider, Content } = Layout;
  return ( 
    <Layout>

        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <img className="logo" src={logo} alt="NA"></img>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="0">
              <Icon type="user" />
              <span>Lock Screen</span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Batteries</span>
            </Menu.Item>
          </Menu>
        </Sider>
        
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{margin: '24px 16px',padding: 24,background: '#f8f8f8',minHeight: 200,}}>
          <Row gutter={[8, 8]}>
                <Col span={16} >
                    <a className="weatherwidget-io" href="https://forecast7.com/en/51d51n0d13/london/" data-label_1="DELHI" data-label_2="WEATHER" data-theme="orange" >LONDON WEATHER</a>
                            {!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://weatherwidget.io/js/widget.min.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","weatherwidget-io-js")}
                    
                </Col>
                <Col span={8} >
                        <div style={{"textAlign":"center","padding":"1em 0"}}>  <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=large&timezone=Asia%2FKolkata" width="100%" height="140" frameBorder="0" seamless></iframe> </div>
                </Col>
              </Row>
          </Content>
          <Content style={{margin: '24px 16px',padding: 24,background: '#f8f8f8',minHeight: 800,}}>
                <Button type="primary" size={10} onClick={this.highlight}>
                Swap batteries
              </Button>
              <Row gutter={[16, 16]}>
                {batteryList && batteryList.map((val)=>{
                  return  <Col span={8} key={val.name}  onClick={()=>this.showModal(val)} ><Battery setBatteryCb={this.setBattery} cell={val} isHighlight={this.state.highlightBattery}/></Col>;
                  })
                }
                </Row>
            <Modal
              title="Battery Info"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              >
              {this.state.currentBattery && <Battery  setBatteryCb={this.setBattery}  cell={this.state.currentBattery} single />}
        </Modal>
          </Content>
        </Layout>
        
      </Layout>
  );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchBatteries: () => dispatch(fetchBatteries()),
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



export default connect(mapStateToProps,mapDispatchToProps)(BatteryList);

