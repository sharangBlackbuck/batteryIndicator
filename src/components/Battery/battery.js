import React from 'react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { Card} from 'antd';
// import { createStructuredSelector } from 'reselect';
// import { makeSelectBatteryList, } from './selectors';
import 'antd/dist/antd.css';
// import {fetchBatteries }from '../../store/actions';
// import logo from "../../assets/images/brand.svg";
import './battery.css';

class Battery extends React.Component {

  componentDidMount(){
    this.batUpdate();
  }

   batUpdate(){
    
    let  charge=this.props.cell.SOC;
    console.log(charge);
      //console.log("Charge: ",charge);
      let col=null;
      if(charge<20){
        // Red - Danger!
        col = ["#750900","#c6462b", "#b74424", "#df0a00", "#590700"];
      }else if(charge<40){
        // Yellow - Might wanna charge soon...
        col = ["#754f00","#f2bb00", "#dbb300", "#df8f00", "#593c00"];
      }else{
        // Green - All good!
        col = ["#316d08","#60b939", "#51aa31", "#64ce11", "#255405"];
      }

    this.cell.style["background-image"]="linear-gradient(to right, transparent 5%, "+col[0]+" 5%, "+col[0]+" 7%, "+col[1]+" 8%, "+col[1]+" 10%, "+col[2]+" 11%, "+col[2]+" "+ (charge-3) +"%, "+col[3]+" "+ (charge-2) +"%, "+col[3]+" "+ charge +"%, "+col[4]+" "+ charge +"%, black "+ (charge+5) +"%, black 95%, transparent 95%), linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 4%, rgba(255,255,255,0.2) 7%, rgba(255,255,255,0.2) 14%, rgba(255,255,255,0.8) 14%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 41%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.4) 86%, rgba(255,255,255,0.6) 90%, rgba(255,255,255,0.1) 92%, rgba(255,255,255,0.1) 95%, rgba(255,255,255,0.5) 98%)";
    this.cell.style["transform"] ='rotateZ(-90deg)'; 
  }

  render() {
    let{cell,single,isHighlight} = this.props;
    console.log(this.props.isHighlight);
  return ( 
    <Card onClick={()=>this.props.setBatteryCb(this.props.cell,single)} bordered={true} className={(single?' full ':' half ')+( isHighlight&&isHighlight.SOC===cell.SOC?' blink_me ':' ') } style={{ height:300,background:"#002640",color:"white","boxShadow": "0 2px 5px 2px rgba(0, 0, 0, 0.16)","margin":10 ,"borderRadius":"8px"}}>
      <div id="battery"  ref={(cell) => { this.cell = cell; }}></div>
      
      {single && <div style={{'marginRight':'30px'}}>
      {Object.keys(cell).map((key)=>{
          return <p className="label_charge">{key} : {cell[key]} </p>;
      })}
      </div>}
      {!single && <div style={{'marginRight':'30px'}}>
         <p className="label_charge">SOC : {this.props.cell.SOC} %</p>
      </div>}
    </Card>
  );
  }
}


export default Battery;

