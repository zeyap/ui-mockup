import React, { PropTypes } from 'react';
import StandardTableView from '../TableView/StandardTableView'
import ListViewBase from './ListViewBase'
import ComplianceProgress from './ComplianceProgress'

class CertificationsListView extends ListViewBase {

  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.bindExpand();
  }

  componentDidUpdate() {
    this.unbind();
    this.bindExpand();
  }

  componentWillUnmount(){
    this.unbind();
  }

  render() {
    // eslint-disable-line no-use-before-define
    // console.log(this.props.apps)
    return (
      <div className="list-group list-view-pf list-view-pf-view">

        {this.props.apps.map((app,i) =>
        <div className="list-group-item" key={i}>

          <div className="list-group-item-header">
            <div className="list-view-pf-expand">
              <span className="fa fa-angle-right"></span>
          </div>
          <div className="list-view-pf-main-info">
            <div className="list-view-pf-left">
              <span className="fa fa-file-o list-view-pf-icon-sm"></span>
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">
                  { app.name }
                </div>
              </div>
                <ComplianceProgress app={app}/>
            </div>
          </div>
        </div>

        <div className="list-group-item-container container-fluid hidden">
          <div className="close">
            <span className="pficon pficon-close"></span>
          </div>
          <p>
            <i>{ app.description }</i>
            <br /><br />
          </p>
          
          <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-9">
            {app.totalControls?(<dl className="dl-horizontal">
                <dt>Total Controls: </dt>
                <dd>{app.totalControls}</dd>
                <dt>Completed Components: </dt>
                <dd>{app.completeComponents.length>0?app.completeComponents.map((comp,id)=>
                (<div key={id} style={{margin: "0 0.5em 0 0"}}>
                <a>{comp}</a></div>)):(<div></div>)}</dd>
                <dt>Partially Completed: </dt>
                <dd>{app.incompleteComponents.length>0?app.incompleteComponents.map((comp,id)=>
                (<div key={id} style={{margin: "0 0.5em 0 0"}}>
                <a id={"componentTooltip-"+id} data-toggle="tooltip" data-placement="top" 
                data-original-title={'Completed: '+comp.complete+'/'+app.totalControls+'; '+'Partially: '+comp.partial+'/'+app.totalControls+'; '+'Non-compliant: '+comp.noncompliant+'/'+app.totalControls}>
                 {comp.name}</a></div>)):(<div></div>)}</dd>
              </dl>)
              :(<dl className="dl-horizontal">
              </dl>)}
              
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
    )
  }

}

export default CertificationsListView;
