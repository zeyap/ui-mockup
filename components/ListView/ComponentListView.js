import React, { PropTypes } from 'react';
import StandardTableView from '../TableView/StandardTableView'
import ListViewBase from './ListViewBase'

class ComponentListView extends ListViewBase {

  constructor(props){
    super(props);

    let serializedByStandards = [];
    for(let key in props.detail){
        serializedByStandards.push(Object.assign(props.detail[key],{name:key}));
    }
    this.state={
        detail: serializedByStandards
    };
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
    
    return (
      <div className="list-group list-view-pf list-view-pf-view">

        {this.state.detail.map((app,i) =>
        <div className="list-group-item" key={i}>

          <div className="list-group-item-header">
            <div className="list-view-pf-expand">
              <span className="fa fa-angle-right"></span>
          </div>
          <div className="list-view-pf-actions">
            <button className="btn btn-default">Details</button>
          </div>
          <div className="list-view-pf-main-info">
            <div className="list-view-pf-left">
              <span className="fa fa-plane list-view-pf-icon-sm"></span>
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">
                  { app.name }
                </div>
              </div>
              <div className="list-view-pf-additional-info">
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-orders"></span>
                  <strong>{ app.totalControls }</strong> Security Controls
                </div>
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-ok"></span>
                  <strong>{ app.satisfied }</strong> Satisfied
                </div>
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-warning-triangle-o"></span>
                  <strong>{ app.partial }</strong> Partially Satisfied	
                </div>
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-error-circle-o"></span>
                  <strong>{ app.noncompliant }</strong> Non-compliant Items
                </div>
                <div id="barChart"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="list-group-item-container container-fluid hidden" style={{padding:'15px'}}>
          
          <StandardTableView detail = {app}/>
          
        </div>
      </div>
      )}
    </div>
    )
  }

}

export default ComponentListView;
