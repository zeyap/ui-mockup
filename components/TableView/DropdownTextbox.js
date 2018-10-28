import React, { PropTypes } from 'react';

export default class DropdownTextbox extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
        let collapseBody = $("#collapse"+this.props.id);
        collapseBody.collapse('hide');
        $("#collapse-header"+this.props.id).on("click",(function(){
          collapseBody.collapse('toggle');
          let sign = $("#collapse-sign"+this.props.id);
          sign.toggleClass('fa-angle-down');
          sign.toggleClass('fa-angle-right');
        }).bind(this));
    }
    render(){
        return (<div style={{padding: "0 10px"}}>
                <div id={"collapse-header"+this.props.id}>
                  <h4 style={{borderBottom:"1px dashed #bbbbbb", height:'1.5em'}}>
                    <div data-toggle="collapse" data-parent="#accordion-markup">
                    <div style={{display:"inline-block", width:'15px',color:'#bbbbbb'}} className="fa fa-angle-down" id={"collapse-sign"+this.props.id}></div>
                    <div style={{fontSize:'0.9em',fontWeight:'lighter',display: "inline-block",width: "calc(100% - 20px)",overflow: "hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {this.props.text}
                    </div>
                    </div>
                  </h4>
                </div>
                <div className="panel-collapse collapse in" id={"collapse"+this.props.id}>
                  <div>
                    {this.props.text}
                  </div>
                </div>
              </div>)
    }
}