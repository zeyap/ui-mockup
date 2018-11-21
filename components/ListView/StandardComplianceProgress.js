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
      let satisfied= (this.app.satisfied||0)/(this.app.totalControls||1),
    partial=(this.app.partial||0)/(this.app.totalControls||1),  
    noncompliant =(this.app.noncompliant||0)/(this.app.totalControls||1), 
    remaining = 1-satisfied-partial-noncompliant;

      return this.app.inheritingComponents && this.app.inheritingComponents.length>0?(<div className="list-view-pf-additional-info">
      
      <div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-orders"></span>
        <strong>{ this.app.totalControls }</strong> Security Controls
        </div>

      <div className="list-view-pf-additional-info-item">
      <span className="pficon pficon-applications"></span>
      <strong>{ Object.keys(this.app.inheritingComponents).length }</strong> Inheriting Components</div>
        </div>)
        
        :(<div className="list-view-pf-additional-info">
      
      {this.app.totalControls===0?(<div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-orders"></span>
        
        Standard File Not Available
        </div>):(<div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-orders"></span>
        
        <strong>{ this.app.totalControls }</strong> Security Controls
        </div>)}
      
        <div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-applications"></span>
        <strong>{ Object.keys(this.app.inheritingComponents).length }</strong> Inheriting Components</div>

        </div>)
  }
}
