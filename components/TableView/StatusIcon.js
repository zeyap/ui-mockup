import React, { PropTypes } from 'react';

export default class StatusIcon extends React.Component{
  constructor(props){
      super(props);
      this.state={
          status: props.status
      }
  }

  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.status !== this.state.status) {
            this.setState({ status: nextProps.status });
        }
    }
  render(){
      return (<span className={{width: '20px', 'font-size':'1.2em',margin: '5px',display:'inline-block'}}>
      {this.state.status==='complete'||this.state.status==='Complete'?(
            <span className="pficon pficon-ok" style={{width:'20px'}}></span>
        ):this.state.status==='partial'||this.state.status==='Partial'?(
            <span className="pficon pficon-warning-triangle-o" style={{width:'20px'}}></span>
        ):(
            <span className="pficon pficon-error-circle-o" style={{width:'20px'}}></span>
        )}
    </span>);
  }
}