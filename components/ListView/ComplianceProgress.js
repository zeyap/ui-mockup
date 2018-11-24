import React, { PropTypes } from 'react';

export default class ComplianceProgress extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  render(){
      this.app = this.props.app;
      // console.log(this.app)
      if(!this.app.totalControls){
        return (
      <div className="list-view-pf-additional-info">
      
      <div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-orders"></span>
        {'Certification File Not Available'}
        </div>
      </div>)
      }else 
      return (
      <div className="list-view-pf-additional-info">

        <div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-orders"></span>
        <strong>{ this.app.totalControls }</strong> Security Controls</div>

        {this.app.completeComponents?(<div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-ok"></span>
        <strong>{ this.app.completeComponents.length }</strong> Completed Components</div>)
        :(<div></div>)}

        {this.app.incompleteComponents?(<div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-warning-triangle-o"></span>
        <strong>{ this.app.incompleteComponents.length }</strong> Partially Completed Components</div>)
        :(<div></div>)}

      </div>)
  }
}
