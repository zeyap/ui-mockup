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

      return (
      <div className="list-view-pf-additional-info">
      
      <div className="list-view-pf-additional-info-item">
        <span className="pficon pficon-orders"></span>
        <strong>{ this.app.totalControls }</strong> Security Controls
        </div>
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-ok"></span>
                  <strong>{ this.app.satisfied }</strong> Satisfied
                </div>

                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-warning-triangle-o"></span>
                  <strong>{ this.app.partial }</strong> Partially Satisfied	
                </div>

                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-error-circle-o"></span>
                  <strong>{ this.app.noncompliant }</strong> Non-compliant Items
                </div>
        
        <div style={{height: '15px', width: '100%'}}></div>
        
        <div style={{height:'15px',width:'calc(100% - 20px)'}} className="progress">
  <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={satisfied*100} aria-valuemin="0" aria-valuemax="100" style={{"width": satisfied*100+'%'}} data-toggle="tooltip" 
  title={(satisfied*100 ).toFixed(1)+ '% Satisfied'}>
    <span className="sr-only">{(satisfied*100 ).toFixed(1)+ '% Satisfied'}</span>
  </div>
  <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={partial*100} aria-valuemin="0" aria-valuemax="100" style={{width: partial*100+'%'}} data-toggle="tooltip" 
  title={(partial*100 ).toFixed(1)+ '% Partial'}>
    <span className="sr-only">{(partial*100 ).toFixed(1)+ '% Partial'}</span>
  </div>
  <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={noncompliant*100} aria-valuemin="0" aria-valuemax="100" style={{width: noncompliant*100+'%'}} data-toggle="tooltip" 
  title={(noncompliant*100 ).toFixed(1)+ '% Noncompliant'}>
    <span className="sr-only">{(noncompliant*100 ).toFixed(1)+ '% Noncompliant'}</span>
  </div>
  <div className="progress-bar progress-bar-remaining" role="progressbar" aria-valuenow={remaining*100} aria-valuemin="0" aria-valuemax="100" style={{width: remaining*100+'%'}} data-toggle="tooltip" 
  title={(remaining*100 ).toFixed(1)+ '% Not included controls'}>
    <span className="sr-only">{(remaining*100 ).toFixed(1)+ '% Not included controls'}</span>
  </div>
  </div>

        </div>


  
      )
  }
}
